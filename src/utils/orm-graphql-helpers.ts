import { BaseEntity } from 'typeorm'
import IRakkitRelationQuery from '../types/Types/IRakkitRelationQuery'

const queryModelName = 'model'

function getQueryFieldName(fieldName: string, mainField: string = null) {
  return `${mainField || queryModelName}.${fieldName}`
}

function getConditionString (mainField: string, subField: string) {
  return `${getQueryFieldName(subField, mainField)} = :${subField}`
}

/**
 * Parse the GraphQL query params and execute it with TypeORM
 * @param model The model on which we execute the requets
 * @param obj The where query conditions
 */
export function composeQuery(
  model: typeof BaseEntity,
  obj: Object,
  options: { or?: boolean, relations?: (string | IRakkitRelationQuery)[] } = {}
) {
  const queryBuilder = model.createQueryBuilder(queryModelName)
  const relationArgs = new Map()

  if (options.relations) {
    // Add relations to the query
    options.relations.map((relation: string | IRakkitRelationQuery) => {
      // Convert the relation parameters to a generic object
      let relationObj: IRakkitRelationQuery
      if (typeof relation === 'string') {
        relationObj = {
          select: true,
          forArg: null,
          table: relation
        }
      } else {
        relationObj = relation
      }
      if (relationObj.table) {
        const newAliasName = relationObj.table.split('.').join('_')
        if (relationObj.forArg) {
          relationArgs.set(relationObj.forArg, newAliasName)
        }
        try {
          queryBuilder.expressionMap.findAliasByName(newAliasName)
        } catch (err) {
          if (relationObj.select) {
            queryBuilder.innerJoinAndSelect(getQueryFieldName(relationObj.table), newAliasName)
          } else {
            queryBuilder.innerJoin(getQueryFieldName(relationObj.table), newAliasName)
          }
        }
      }
    })
  }

  const parseObjToQuery = (obj, mainField = queryModelName, stop = false) => {
    Object.getOwnPropertyNames(obj).map((prop: string) => {
      const value = obj[prop]
      // Ignore the GraphQL query parameter if the value is not given (= undefined)
      if (value !== undefined) {
        // If the given value is a relation, join the table and add the conditions into the where
        // Stop set the max depth to 1
        const relationValue = relationArgs.get(prop)
        if (relationValue && !stop) {
          parseObjToQuery(value, relationValue, true)
        } else if (!relationValue && typeof value !== 'object') {
          // Add the where condition to the query
          const whereCondition = getConditionString(mainField, prop)
          const whereValueToReplace = { [prop]: value }
          if (queryBuilder.expressionMap.wheres.length > 0) {
            if (options.or) {
              queryBuilder.orWhere(whereCondition, whereValueToReplace)
            } else {
              queryBuilder.andWhere(whereCondition, whereValueToReplace)
            }
          } else {
            queryBuilder.where(whereCondition, whereValueToReplace)
          }
        }
      }
    })
  }
  parseObjToQuery(obj)

  return queryBuilder
}

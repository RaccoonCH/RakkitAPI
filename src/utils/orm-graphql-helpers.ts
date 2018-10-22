import { BaseEntity } from 'typeorm'
import IRakkitRelationQuery from '../types/Types/RakkitGraphQL/IRakkitRelationQuery'

const queryModelName = 'model'

function getQueryFieldName(fieldName: string, mainField: string = queryModelName): string {
  if (mainField) {
    return `${mainField}.${fieldName}`
  } else {
    return fieldName
  }
}

function getConditionString (mainField: string, subField: string): string {
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
  options: {
    relations?: (string | IRakkitRelationQuery)[],
    skip?: number,
    limit?: number
    last?: number,
    first?: number,
    conditionOperator?: 'or' | 'and'
  } = {}
) {
  const queryBuilder = model.createQueryBuilder(queryModelName)
  const relationArgs = new Map()

  if (options.skip && options.limit) {
    queryBuilder.take(options.limit)
    queryBuilder.skip(options.skip)
  }

  options.limit && queryBuilder.limit(options.limit)

  if (options.first) {
    queryBuilder.take(options.first)
  }
  
  if (options.last) {
    queryBuilder.orderBy(getQueryFieldName('Id'), 'DESC')
    queryBuilder.take(options.last)
  }

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
        // Culture.Example => Culture_Example
        const pathProps = relationObj.table.split('.')
        const newAliasName = pathProps.join('_')
        if (relationObj.forArg) {
          relationArgs.set(relationObj.forArg, newAliasName)
        }
        try {
          queryBuilder.expressionMap.findAliasByName(newAliasName)
        } catch (err) {
          const queryFielName = pathProps.length > 1 ? relationObj.table : getQueryFieldName(relationObj.table)
          if (relationObj.select) {
            queryBuilder.innerJoinAndSelect(queryFielName, newAliasName)
          } else {
            queryBuilder.innerJoin(queryFielName, newAliasName)
          }
        }
      }
    })
  }

  const parseObjToQuery = (obj, mainField = queryModelName, parentProp = null) => {
    Object.getOwnPropertyNames(obj).map((prop: string) => {
      const value = obj[prop]
      
      // Ignore the GraphQL query parameter if the value is not given (= undefined)
      if (value !== undefined) {
        const propPath = getQueryFieldName(prop, parentProp)

        // If the given value is a relation, join the table and add the conditions into the where
        const relationValue = relationArgs.get(propPath)
        if (relationValue) {
          parseObjToQuery(value, relationValue, propPath)
        } else if (!relationValue && typeof value !== 'object') {
          // Add the where condition to the query
          const whereCondition = getConditionString(mainField, prop)
          const whereValueToReplace = { [prop]: value }
          if (queryBuilder.expressionMap.wheres.length > 0) {
            if (options.conditionOperator === 'or') {
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

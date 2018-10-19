import { BaseEntity } from 'typeorm'

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
export function composeQuery(model: typeof BaseEntity, obj: Object, options: {relations: string[]} = null) {
  const queryBuilder = model.createQueryBuilder(queryModelName)
  const parseObjToQuery = (obj, mainField = queryModelName) => {
    Object.getOwnPropertyNames(obj).map((prop: string) => {
      const value = obj[prop]
      // Ignore the GraphQL query parameter if the value is not given (= undefined)
      if (value !== undefined) {
        // If the given value is a relation, join the table and add the conditions into the where
        if (value.relation) {
          queryBuilder.innerJoinAndSelect(getQueryFieldName(value.relation), value.relation)
          if (value.value) {
            parseObjToQuery(value.value, value.relation)
          }
        } else {
          // Add the where condition to the query
          const whereCondition = getConditionString(mainField, prop)
          const whereValueToReplace = { [prop]: value }
          if (queryBuilder.expressionMap.wheres.length > 0) {
            queryBuilder.andWhere(whereCondition, whereValueToReplace)
          } else {
            queryBuilder.where(whereCondition, whereValueToReplace)
          }
        }
      }
    })
  }
  parseObjToQuery(obj)

  if (options) {
    if (options.relations) {
      options.relations.map((relation: string) => {
        const newAliasName = relation.split('.').join('_')
        try {
          queryBuilder.expressionMap.findAliasByName(newAliasName)
        } catch (err) {
          queryBuilder.innerJoinAndSelect(relation, newAliasName)
        }
      })
    }
  }

  return queryBuilder
}

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
export function composeQuery(model: typeof BaseEntity, obj: Object, options: { or?: boolean, relations?: string[] } = {}) {
  const queryBuilder = model.createQueryBuilder(queryModelName)

  const parseObjToQuery = (obj, mainField = queryModelName, stop = false) => {
    Object.getOwnPropertyNames(obj).map((prop: string) => {
      const value = obj[prop]
      // Ignore the GraphQL query parameter if the value is not given (= undefined)
      if (value !== undefined) {
        // If the given value is a relation, join the table and add the conditions into the where
        // Stop set the max depth to 1
        if (value.relation && value.value && !stop) {
          queryBuilder.innerJoinAndSelect(getQueryFieldName(value.relation), value.relation)
          parseObjToQuery(value.value, value.relation, true)
        } else if (!value.relation) {
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

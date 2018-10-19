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
export function composeQuery(model: typeof BaseEntity, obj: Object) {
  const queryBuilder = model.createQueryBuilder(queryModelName)
  let oneWhereCondition = false
  const parseObjToQuery = (obj, mainField = queryModelName) => {
    Object.getOwnPropertyNames(obj).map((prop: string) => {
      const value = obj[prop]
      // Ignore the GraphQL query parameter if the value is not given (= undefined)
      if (value !== undefined) {
        // If the given value is a relation, join the table and add the conditions into the where
        if (value.relation) {
          queryBuilder.innerJoinAndSelect(getQueryFieldName(value.relation), value.relation)
          parseObjToQuery(value.value, value.relation)
        } else {
          // Add the where condition to the query
          const whereCondition = getConditionString(mainField, prop)
          const whereValueToReplace = { [prop]: value }
          if (oneWhereCondition) {
            queryBuilder.andWhere(whereCondition, whereValueToReplace)
          } else {
            queryBuilder.where(whereCondition, whereValueToReplace)
          }

          // To indicate andWhere or where
          oneWhereCondition = true
        }
      }
    })
  }
  parseObjToQuery(obj)
  return queryBuilder
}

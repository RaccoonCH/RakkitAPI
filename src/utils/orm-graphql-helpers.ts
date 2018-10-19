import { BaseEntity } from 'typeorm'
const queryModelName = 'model'

const getQueryFieldName = (fieldName: string) => queryModelName + '.' + fieldName
const getConditionString = (mainProp: string, subProp: string) => `${mainProp}.${subProp} = :${subProp}`

/**
 * Parse the GraphQL query params and execute it with TypeORM
 * @param model The model to execute the query
 * @param obj the query object
 */
export function composeQuery(model: typeof BaseEntity, obj: Object) {
  const queryBuilder = model.createQueryBuilder(queryModelName)
  const queryObj = []
  // Parse relations
  Object.getOwnPropertyNames(obj)
  .map((prop: string) => {
    const value = obj[prop]
    if (value !== undefined) {
      const queryFieldName = getQueryFieldName(prop)
      if (typeof obj[prop] === 'object') {
        queryBuilder.innerJoinAndSelect(queryFieldName, prop)
        const relationObj = <Object>value
        Object.getOwnPropertyNames(relationObj).map(ro => {
          queryObj.push({
            condition: getConditionString(prop,  ro),
            value: {[ro]: relationObj[ro]}
          })
        })
      } else {
        queryObj.push({
          condition: getConditionString(queryModelName, prop),
          value: {[prop]: value}
        })
      }
    }
  })
  queryObj.map((query: {condition: string, value: {}}, index: number) => {
    if (index > 0) {
      queryBuilder.andWhere(query.condition, query.value)
    } else {
      queryBuilder.where(query.condition, query.value)
    }
  })
  return queryBuilder
}

/** If a value is not passed into params, ingore this value into where condition
 * @param obj The args object
 */
export function where(obj: Object) {
  return Object.getOwnPropertyNames(obj)
  .reduce((finalObj: Object, prop: string) => {
    const VALUE = obj[prop]
    if (VALUE !== undefined) {
      finalObj[prop] = VALUE
    }
    return finalObj
  }, {})
}

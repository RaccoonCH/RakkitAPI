import { BaseEntity } from 'typeorm'
import { IRelationQuery } from '..'

const queryModelName = 'model'
type ComposeQueryOptions = {
  relations?: (string | IRelationQuery)[],
  skip?: number,
  limit?: number
  last?: number,
  first?: number,
  conditionOperator?: 'or' | 'and'
}

export class OrmInterface {
  private _model: typeof BaseEntity

  public get Model() {
    return this._model
  }
  public set Model(val: typeof BaseEntity) {
    this._model = val
  }

  constructor(model: typeof BaseEntity) {
    this.Model = model
  }

  private getQueryFieldName(fieldName: string, mainField: string = queryModelName): string {
    if (mainField) {
      return `${mainField}.${fieldName}`
    } else {
      return fieldName
    }
  }

  private getConditionString(mainField: string, subField: string): string {
    return `${this.getQueryFieldName(subField, mainField)} = :${subField}`
  }

  /**
   * Compose a TypeORM query from a GraphQL query
   * @param where The where conditions
   * @param options The other options
   */
  ComposeQuery(options: ComposeQueryOptions)
  ComposeQuery(where: Object, options?: ComposeQueryOptions)
  ComposeQuery(where: Object | undefined, options: ComposeQueryOptions = {}) {
    const queryBuilder = this.Model.createQueryBuilder(queryModelName)
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
      queryBuilder.orderBy(this.getQueryFieldName('Id'), 'DESC')
      queryBuilder.take(options.last)
    }

    if (options.relations) {
      // Add relations to the query
      options.relations.map((relation: string | IRelationQuery) => {
        // Convert the relation parameters to a generic object
        let relationObj: IRelationQuery
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
            const queryFielName = pathProps.length > 1 ? relationObj.table : this.getQueryFieldName(relationObj.table)
            if (relationObj.select) {
              queryBuilder.innerJoinAndSelect(queryFielName, newAliasName)
            } else {
              queryBuilder.innerJoin(queryFielName, newAliasName)
            }
          }
        }
      })
    }

    const parseObjToQuery = (obj: Object, mainField: string = queryModelName, parentProp: string = null) => {
      Object.getOwnPropertyNames(obj).map((prop: string) => {
        const value = obj[prop]

        // Ignore the GraphQL query parameter if the value is not given (= undefined)
        if (value !== undefined) {
          const propPath = this.getQueryFieldName(prop, parentProp)

          // If the given value is a relation, join the table and add the conditions into the where
          const relationValue = relationArgs.get(propPath)
          if (relationValue) {
            parseObjToQuery(value, relationValue, propPath)
          } else if (!relationValue && typeof value !== 'object') {
            // Add the where condition to the query
            const whereCondition = this.getConditionString(mainField, prop)
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
    if (where) {
      parseObjToQuery(where)
    }

    return queryBuilder
  }
}
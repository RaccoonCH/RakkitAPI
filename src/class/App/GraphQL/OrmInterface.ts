import { BaseEntity, QueryBuilder, getConnection, ObjectType, EntitySchema, QueryRunner, SelectQueryBuilder } from 'typeorm'
import { IRelationQuery, OrderByArgs } from '..'

const queryModelName = 'model'
type ComposeQueryOptions = {
  relations?: (string | IRelationQuery)[],
  skip?: number,
  limit?: number
  last?: number,
  first?: number,
  orderBy?: OrderByArgs,
  conditionOperator?: 'or' | 'and'
}

export class OrmInterface<Entity> {
  private _model: ObjectType<Entity>

  public get Model() {
    return this._model
  }
  public set Model(val: ObjectType<Entity>) {
    this._model = val
  }

  constructor(model: ObjectType<Entity>) {
    this.Model = model
  }

  private getQueryFieldName(fieldName: string, mainField: string = null, noBase?: boolean): string {
    const fieldProps = fieldName.split('.')
    const basic = (mainField) => mainField ? `${mainField}.${fieldName}` : fieldName
    if (mainField) {
      return basic(mainField)
    } else {
      return fieldProps.length > 1 ? fieldName : basic(noBase ? null : queryModelName)
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
  ComposeQuery(): SelectQueryBuilder<Entity>
  ComposeQuery(where: Object, options?: ComposeQueryOptions): SelectQueryBuilder<Entity>
  ComposeQuery(where?: Object, options?: ComposeQueryOptions): SelectQueryBuilder<Entity> {
    const queryBuilder = getConnection().createQueryBuilder(this.Model, queryModelName)
    const relationArgs = new Map()
    let conditionOperator: 'or' | 'and' = 'and'

    if (options) {
      conditionOperator = options.conditionOperator

      if (options.orderBy) {
        queryBuilder.orderBy(
          this.getQueryFieldName(options.orderBy.field),
          options.orderBy.direction
        )
      } else {
        queryBuilder.orderBy(this.getQueryFieldName('Id'), 'ASC')
      }

      if (options.skip && options.limit) {
        queryBuilder.take(options.limit)
        queryBuilder.skip(options.skip)
      }

      options.limit && queryBuilder.limit(options.limit)

      if (options.first) {
        queryBuilder.take(options.first)
      }

      if (options.last) {
        if (!options.orderBy) {
          queryBuilder.orderBy(this.getQueryFieldName('Id'), 'DESC')
        } else {
          // Reverse the orderBy parameter
          queryBuilder.orderBy(
            this.getQueryFieldName(options.orderBy.field),
            options.orderBy.direction === 'ASC' ? 'DESC' : 'ASC'
          )
        }
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
              forArg: relation,
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
              const queryFieldName = this.getQueryFieldName(relationObj.table)
              if (relationObj.select) {
                queryBuilder.innerJoinAndSelect(queryFieldName, newAliasName)
              } else {
                queryBuilder.innerJoin(queryFieldName, newAliasName)
              }
            }
          }
        })
      }
    }

    const parseObjToQuery = (obj: Object, mainField: string = queryModelName, parentProp: string = null) => {
      Object.getOwnPropertyNames(obj).map((prop: string) => {
        const value = obj[prop]

        // Ignore the GraphQL query parameter if the value is not given (= undefined)
        if (value !== undefined) {
          const propPath = this.getQueryFieldName(prop, parentProp, true)

          // If the given value is a relation, join the table and add the conditions into the where
          const relationValue = relationArgs.get(propPath)
          if (relationValue) {
            parseObjToQuery(value, relationValue, propPath)
          } else if (!relationValue && typeof value !== 'object') {
            // Add the where condition to the query
            const whereCondition = this.getConditionString(mainField, prop)
            const whereValueToReplace = { [prop]: value }
            if (queryBuilder.expressionMap.wheres.length > 0) {
              if (conditionOperator === 'or') {
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

import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export abstract class QueryArgs {
  abstract readonly where

  @Field({ nullable: true })
  readonly skip: number

  @Field({ nullable: true })
  readonly limit: number

  @Field({ nullable: true })
  readonly last: number

  @Field({ nullable: true })
  readonly first: number

  @Field({ nullable: true })
  readonly conditionOperator: 'or' | 'and'
}

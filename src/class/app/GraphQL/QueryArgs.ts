import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export abstract class QueryArgs {
  abstract where

  @Field({ nullable: true })
  skip: number

  @Field({ nullable: true })
  limit: number

  @Field({ nullable: true })
  last: number

  @Field({ nullable: true })
  first: number

  @Field({ nullable: true })
  conditionOperator: 'or' | 'and'
}

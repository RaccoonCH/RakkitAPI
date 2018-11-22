import { ArgsType, Field, InputType } from 'type-graphql'

@InputType()
export abstract class OrderByArgs {
  @Field()
  field: string

  @Field()
  direction: 'DESC' | 'ASC'
}

@ArgsType()
export abstract class QueryArgs {
  abstract readonly where

  @Field({ nullable: true })
  readonly count?: boolean

  @Field({ nullable: true })
  readonly skip?: number

  @Field({ nullable: true })
  readonly limit?: number

  @Field({ nullable: true })
  readonly last?: number

  @Field({ nullable: true })
  readonly first?: number

  @Field({ nullable: true })
  readonly conditionOperator?: 'or' | 'and'

  @Field(type => OrderByArgs, { nullable: true })
  readonly orderBy?: OrderByArgs
}

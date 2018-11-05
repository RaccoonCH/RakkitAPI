import { ArgsType, Field } from 'type-graphql'
import { RegisterArgs } from '../Register/RegisterArgs'

@ArgsType()
export class UpdateArgs extends RegisterArgs {
  @Field()
  Id: number

  @Field()
  Role: string
}

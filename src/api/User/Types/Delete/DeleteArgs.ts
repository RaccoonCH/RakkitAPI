import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class DeleteArgs {
  @Field()
  id: number
}

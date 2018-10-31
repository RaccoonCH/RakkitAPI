import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class LoginArgs {
  @Field()
  name: string

  @Field()
  password: string
}

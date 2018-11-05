import UserModel from '../../UserModel'
import { ArgsType, Field, InputType } from 'type-graphql'

@ArgsType()
export class RegisterArgs implements Pick<UserModel, 'Name' | 'Email' | 'Password'> {
  @Field()
  Name: string

  @Field()
  Email: string

  @Field()
  Password: string

  @Field()
  Confirm: string
}

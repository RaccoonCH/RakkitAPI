import { GetableUser } from '../GetableUser'
import { ArgsType, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class LoginResponse {
  @Field()
  Token: string

  @Field(type => GetableUser)
  User: GetableUser
}

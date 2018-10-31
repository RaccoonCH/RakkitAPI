import { GetableUser } from '../GetableUser'
import { ArgsType, Field, ObjectType } from 'type-graphql'

@ObjectType()
export class LoginResponse {
  @Field()
  token: string

  @Field(type => GetableUser)
  user: GetableUser
}

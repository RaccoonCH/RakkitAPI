import { ObjectType, Field } from 'type-graphql'
import { GetableUser } from '..'

@ObjectType()
export class UserGetResponse {
  @Field({ nullable: true })
  count?: number

  @Field(type => [GetableUser])
  items: Array<GetableUser>
}

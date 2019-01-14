import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Notif {
  @Field()
  date: Date
}

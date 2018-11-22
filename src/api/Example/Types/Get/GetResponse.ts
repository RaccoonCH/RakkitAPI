import { ObjectType, Field } from 'type-graphql'
import ExampleModel from '../../ExampleModel'

@ObjectType()
export class ExampleGetResponse {
  @Field({ nullable: true })
  count?: number

  @Field(type => [ExampleModel])
  items: Array<ExampleModel>
}

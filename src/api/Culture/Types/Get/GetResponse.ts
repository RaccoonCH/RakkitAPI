import { ObjectType, Field } from 'type-graphql'
import CultureModel from '../../CultureModel'

@ObjectType()
export class CultureGetResponse {
  @Field({ nullable: true })
  count?: number

  @Field(type => [CultureModel])
  items: Array<CultureModel>
}

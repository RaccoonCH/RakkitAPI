import { ObjectType, Field } from 'type-graphql'
import PageModel from '../../PageModel'

@ObjectType()
export class PageGetResponse {
  @Field({ nullable: true })
  count?: number

  @Field(type => [PageModel])
  items: Array<PageModel>
}

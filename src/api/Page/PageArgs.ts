import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../class/app'
import PageModel from './PageModel'

@InputType()
class PageArgs implements Pick<PageModel, 'Url' | 'Title'> {
  @Field({ nullable: true })
  public readonly Url: string

  @Field({ nullable: true })
  public readonly Title: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => PageArgs, { nullable: true })
  where: PageArgs
}

import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs, GraphqlUtils } from '../../../class/App'
import { CultureType } from '../../Culture/Types'
import PageModel from '../PageModel'

@InputType()
export class PageType implements Pick<PageModel, 'Url' | 'Title'> {
  @Field({ nullable: true })
  public readonly Url: string

  @Field({ nullable: true })
  public readonly Title: string

  @Field(type => CultureType, { nullable: true })
  public readonly Culture: CultureType
}

@ArgsType()
export class PageArgs extends GraphqlUtils.createArgsClass(PageType) {}

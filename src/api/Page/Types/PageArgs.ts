import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../../class/App'
import PageModel from '../PageModel'
import { CultureType } from '../../Culture/Types'

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
export class PageArgs extends QueryArgs {
  @Field(type => PageType, { nullable: true })
  where: PageType
}

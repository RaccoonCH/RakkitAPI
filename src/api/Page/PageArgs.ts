import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../class/App'
import PageModel from './PageModel'
import { CultureArgs } from '../Culture/CultureArgs'
import { ExampleArgs } from '../Example/ExampleArgs'

@InputType()
export class PageArgs implements Pick<PageModel, 'Url' | 'Title'> {
  @Field({ nullable: true })
  public readonly Url: string

  @Field({ nullable: true })
  public readonly Title: string

  @Field(type => CultureArgs, { nullable: true })
  public readonly Culture: CultureArgs
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => PageArgs, { nullable: true })
  where: PageArgs
}

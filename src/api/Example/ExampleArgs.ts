import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../class/app'
import ExampleModel from './ExampleModel'

@InputType()
class ExampleArgs implements Pick<ExampleModel, 'Name' | 'Text'> {
  @Field({ nullable: true })
  public readonly Name: string

  @Field({ nullable: true })
  public readonly Text: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => ExampleArgs, { nullable: true })
  where: ExampleArgs
}

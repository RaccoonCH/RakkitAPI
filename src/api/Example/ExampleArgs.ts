import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../class/App'
import ExampleModel from './ExampleModel'

@InputType()
export class ExampleArgs implements Pick<ExampleModel, 'Name'> {
  @Field({ nullable: true })
  public readonly Name: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => ExampleArgs, { nullable: true })
  where: ExampleArgs
}

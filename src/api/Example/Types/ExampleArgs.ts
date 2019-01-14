import { ArgsType, InputType, Field } from 'type-graphql'
import { GraphqlUtils } from '../../../class/App'
import ExampleModel from '../ExampleModel'

@InputType()
export class ExampleType implements Pick<ExampleModel, 'Name'> {
  @Field({ nullable: true })
  public readonly Name: string
}

@ArgsType()
export class ExampleArgs extends GraphqlUtils.createArgsClass(ExampleType) {}

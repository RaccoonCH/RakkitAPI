import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../../class/App'
import ExampleModel from '../ExampleModel'

@InputType()
export class ExampleType implements Pick<ExampleModel, 'Name'> {
  @Field({ nullable: true })
  public readonly Name: string
}

@ArgsType()
export class ExampleArgs extends QueryArgs {
  @Field(type => ExampleType, { nullable: true })
  where: ExampleType
}

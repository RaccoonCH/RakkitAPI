import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../class/App'
import _MODEL_FILE_ from './_MODEL_FILE_'

@InputType()
class _ARGS_NAME_ implements Pick<_MODEL_FILE_, 'Id' | 'Name'> {
  @Field({ nullable: true })
  public readonly Id: number

  @Field({ nullable: true })
  public readonly Name: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => _ARGS_NAME_, { nullable: true })
  where: _ARGS_NAME_
}

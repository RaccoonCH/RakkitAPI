import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../class/App'
import CultureModel from './CultureModel'

@InputType()
class CultureArgs implements Pick<CultureModel, 'LangCode' | 'CountryCode'> {
  @Field({ nullable: true })
  public readonly LangCode: string

  @Field({ nullable: true })
  public readonly CountryCode: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => CultureArgs, { nullable: true })
  where: CultureArgs
}

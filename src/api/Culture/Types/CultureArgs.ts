import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../../class/App'
import CultureModel from '../CultureModel'

@InputType()
export class CultureType implements Pick<CultureModel, 'LangCode' | 'CountryCode'> {
  @Field({ nullable: true })
  public readonly LangCode: string

  @Field({ nullable: true })
  public readonly CountryCode: string
}

@ArgsType()
export class CultureArgs extends QueryArgs {
  @Field(type => CultureType, { nullable: true })
  where: CultureType
}

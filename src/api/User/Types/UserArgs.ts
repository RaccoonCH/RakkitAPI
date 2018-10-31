import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../../class/App'
import UserModel from '../UserModel'

@InputType()
export class UserArgs implements Pick<UserModel, 'Id' | 'Name'> {
  @Field({ nullable: true })
  public readonly Id: number

  @Field({ nullable: true })
  public readonly Name: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => UserArgs, { nullable: true })
  where: UserArgs
}

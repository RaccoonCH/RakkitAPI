import { ArgsType, Field, InputType } from 'type-graphql'
import { QueryArgs } from '../../../class/App'
import UserModel from '../UserModel'

@InputType()
export class UserArgs implements Pick<UserModel, 'Id' | 'Name' | 'Email' | 'Role'> {
  @Field({ nullable: true })
  public readonly Id: number

  @Field({ nullable: true })
  public readonly Name: string

  @Field({ nullable: true })
  public readonly Email: string

  @Field({ nullable: true })
  public readonly Role: string
}

@ArgsType()
export default class extends QueryArgs {
  @Field(type => UserArgs, { nullable: true })
  where: UserArgs
}

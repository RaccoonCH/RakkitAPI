import { ArgsType, Field, InputType } from 'type-graphql'
import { GraphqlUtils } from '../../../class/App'
import UserModel from '../UserModel'

@InputType()
export class UserType implements Pick<UserModel, 'Id' | 'Name' | 'Email' | 'Role'> {
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
export class UserArgs extends GraphqlUtils.createArgsClass(UserType) {}

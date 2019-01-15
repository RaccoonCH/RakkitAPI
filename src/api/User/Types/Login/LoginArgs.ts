import { ArgsType, Field } from "type-graphql";
import UserModel from "../../UserModel";

@ArgsType()
export class LoginArgs implements Pick<UserModel, "Name" | "Password"> {
  @Field()
  Name: string;

  @Field()
  Password: string;
}

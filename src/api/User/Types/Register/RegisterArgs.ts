import { ArgsType, Field } from "type-graphql";
import UserModel from "../../UserModel";

@ArgsType()
export class RegisterArgs implements Pick<UserModel, "Name" | "Email" | "Password"> {
  @Field()
  Name: string;

  @Field()
  Email: string;

  @Field()
  Password: string;

  @Field()
  Confirm: string;
}

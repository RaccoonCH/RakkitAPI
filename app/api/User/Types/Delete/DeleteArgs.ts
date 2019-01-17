import { ArgsType, Field } from "type-graphql";
import UserModel from "@api/User/UserModel";

@ArgsType()
export class DeleteArgs implements Pick<UserModel, "Id"> {
  @Field()
  Id: number;
}

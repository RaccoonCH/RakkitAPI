import { Field, ObjectType } from "type-graphql";
import { GetableUser } from "../GetableUser";

@ObjectType()
export class LoginResponse {
  @Field()
  Token: string;

  @Field(type => GetableUser)
  User: GetableUser;
}

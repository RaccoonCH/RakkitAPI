import { Field, InputType } from "type-graphql";

@InputType()
export abstract class OrderByArgs {
  @Field()
  field: string;

  @Field()
  direction: "DESC" | "ASC";
}

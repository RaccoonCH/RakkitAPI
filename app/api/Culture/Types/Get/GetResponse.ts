import { IGetResponse } from "@types";
import { ObjectType, Field } from "type-graphql";
import CultureModel from "@api/Culture/CultureModel";

@ObjectType()
export class CultureGetResponse implements IGetResponse {
  @Field()
  readonly count: number;

  @Field(type => [CultureModel])
  readonly items: CultureModel[];
}

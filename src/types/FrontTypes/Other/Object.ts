import { FrontType } from "@types";

export class RObject extends FrontType {
  readonly propertyToShow: string;

  constructor(propertyToShow?: string) {
    super("object");
    this.propertyToShow = propertyToShow;
  }
}

import { FrontType } from "@types";

export class RPassword extends FrontType {
  readonly maskText: string = "rakkit";

  constructor(maskText?: string) {
    super("password");
    this.maskText = maskText;
  }
}

import { FrontType } from "@types";

export class RId extends FrontType {
  readonly placeholder: string;

  constructor(placeholder?: string) {
    super("id");
    this.placeholder = placeholder;
  }
}

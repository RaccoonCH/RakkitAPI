import { FrontType, IText } from "@types";

export class Json extends FrontType implements IText {
  readonly placeholder: string;

  constructor(placeholder?: string) {
    super("json", "text");
    this.placeholder = placeholder;
  }
}

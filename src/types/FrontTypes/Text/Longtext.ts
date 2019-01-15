import { FrontType, IText } from "@types";

export class RLongtext extends FrontType implements IText {
  readonly placeholder: string;

  constructor(placeholder?: string) {
    super("long", "text");
    this.placeholder = placeholder;
  }
}

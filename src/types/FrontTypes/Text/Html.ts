import { FrontType, IText } from "@types";

export class RHtml extends FrontType implements IText {
  readonly placeholder: string;

  constructor(placeholder?: string) {
    super("html", "text");
    this.placeholder = placeholder;
  }
}

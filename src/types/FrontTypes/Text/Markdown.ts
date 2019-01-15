import { FrontType, IText } from "@types";

export class RMarkdown extends FrontType implements IText {
  readonly placeholder: string;

  constructor(
    placeholder?: string
  ) {
    super("md", "text");
    this.placeholder = placeholder;
  }
}

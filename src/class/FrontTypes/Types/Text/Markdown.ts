import { Type, IText } from '../..'

export class RMarkdown extends Type implements IText {
  public readonly placeholder: string

  constructor(
    placeholder?: string
  ) {
    super('md', 'text')
    this.placeholder = placeholder
  }
}

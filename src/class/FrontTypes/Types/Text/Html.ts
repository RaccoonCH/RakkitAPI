import { Type, IText } from '../..'

export class RHtml extends Type implements IText {
  public readonly placeholder: string

  constructor(placeholder?: string) {
    super('text:json')
    this.placeholder = placeholder
  }
}

import { Type, IText } from '../..'

export class RShorttext extends Type implements IText {
  public readonly placeholder: string

  constructor(placeholder?: string) {
    super('text:short')
    this.placeholder = placeholder
  }
}

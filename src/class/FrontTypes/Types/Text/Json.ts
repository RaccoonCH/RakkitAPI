import { Type, IText } from '../..'

export class Json extends Type implements IText {
  public readonly placeholder: string

  constructor(placeholder?: string) {
    super('json', 'text')
    this.placeholder = placeholder
  }
}

import { Type, IText } from '../..'

export class RLongtext extends Type implements IText {
  public readonly placeholder: string

  constructor(placeholder?: string) {
    super('long', 'text')
    this.placeholder = placeholder
  }
}

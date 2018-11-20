import { Type } from '../..'

export class RId extends Type {
  public readonly placeholder: string

  constructor(placeholder?: string) {
    super('other:id')
    this.placeholder = placeholder
  }
}

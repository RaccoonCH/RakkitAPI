import { Type } from '../..'

export class RId extends Type {
  public readonly placeholder: string

  constructor(placeholder?: string) {
    super('id')
    this.placeholder = placeholder
  }
}

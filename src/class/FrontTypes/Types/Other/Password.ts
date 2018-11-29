import { Type } from '../..'

export class RPassword extends Type {
  public readonly maskText: string = 'rakkit'

  constructor(maskText?: string) {
    super('password')
    this.maskText = maskText
  }
}

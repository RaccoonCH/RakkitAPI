import  { Type } from '../../'

export default class RDate extends Type {
  public readonly placeholder: string
  public readonly format: string

  constructor(
    placeholder?: string,
    format?: string
  ) {
    super('other:date')
    this.format = format
    this.placeholder = placeholder
  }
}

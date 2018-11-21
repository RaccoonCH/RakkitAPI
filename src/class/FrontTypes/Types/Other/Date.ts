import  { Type } from '../../'

export class RDate extends Type {
  public readonly placeholder: string
  public readonly format: string

  constructor(
    placeholder?: string,
    format?: string
  ) {
    super('date')
    this.format = format
    this.placeholder = placeholder
  }
}

import  { Type, INumber } from '../../'

export class RInteger extends Type implements INumber {
  public readonly min?: number
  public readonly max?: number

  constructor(
    min?: number,
    max?: number
  ) {
    super('int', 'number')
    this.min = min
    this.max = max
  }
}

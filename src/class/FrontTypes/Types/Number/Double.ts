import  { Type, INumber } from '../../'

export class RDouble extends Type implements INumber {
  public readonly precision?: number
  public readonly min?: number
  public readonly max?: number

  constructor(
    precision?: number,
    min?: number,
    max?: number
  ) {
    super('double', 'number')
    this.precision = precision
    this.min = min
    this.max = max
  }
}

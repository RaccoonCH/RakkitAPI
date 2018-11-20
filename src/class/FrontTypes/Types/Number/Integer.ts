import  { Type, INumber } from '../../'

export class RInteger extends Type implements INumber {
  public readonly min?: number
  public readonly max?: number

  constructor(
    min?: number,
    max?: number
  ) {
    super('number:int')
    this.min = min
    this.max = max
  }
}

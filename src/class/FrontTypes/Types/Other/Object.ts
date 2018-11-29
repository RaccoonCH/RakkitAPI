import { Type } from '../..'

export class RObject extends Type {
  public readonly propertyToShow: string

  constructor(propertyToShow?: string) {
    super('object')
    this.propertyToShow = propertyToShow
  }
}

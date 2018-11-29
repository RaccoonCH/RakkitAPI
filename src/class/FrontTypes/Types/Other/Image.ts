import { Type } from '../..'

export class RImage extends Type {
  public readonly placeholder: string
  public readonly sizeUnit: string
  public readonly maxSize: number
  public readonly acceptedMime: string[]

  constructor(
    acceptedMime?: string[],
    sizeUnit?: string,
    maxSize?: number,
    placeholder?: string
  ) {
    super('image')
    this.placeholder = placeholder
    this.acceptedMime = acceptedMime
    this.sizeUnit = sizeUnit
    this.maxSize = maxSize
  }
}

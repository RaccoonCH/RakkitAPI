import { IType } from '../..'

export class RImage implements IType {
  TypeName: string = 'object'
  IsEditable: boolean
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  SizeUnit: string
  MaxSize: number
  AcceptedMIME: string[]

  constructor(
    acceptedMIME: string[],
    sizeUnit: string,
    maxSize: number,
    isInHeader: boolean = false,
    isSearchable: boolean = false,
    isEditable: boolean = true,
    placeOrder: number = 0
  ) {
    this.AcceptedMIME = acceptedMIME
    this.SizeUnit = sizeUnit
    this.MaxSize = maxSize
    this.IsEditable = isEditable
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

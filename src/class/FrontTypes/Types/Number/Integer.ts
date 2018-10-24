import  { IType, INumber } from '../../'

export class RInteger implements IType, INumber {
  TypeName: string = 'number:int'
  IsEditable: boolean
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  PropertyToShow: string
  Min?: number
  Max?: number

  constructor(
    min: number = null,
    max: number = null,
    isInHeader: boolean = false,
    isSearchable: boolean = false,
    isEditable: boolean = true,
    placeOrder: number = 0
  ) {
    this.Min = min
    this.Max = max
    this.IsEditable = isEditable
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

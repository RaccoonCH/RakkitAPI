import  { IType, INumber } from '../../'

export class RDouble implements IType, INumber {
  TypeName: string = 'number:double'
  IsEditable: boolean
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  PropertyToShow: string
  Precision?: number
  Min?: number
  Max?: number

  constructor(
    precision: number = 3,
    min: number = null,
    max: number = null,
    isInHeader: boolean = false,
    isSearchable: boolean = false,
    isEditable: boolean = true,
    placeOrder: number = 0
  ) {
    this.Precision = precision
    this.Min = min
    this.Max = max
    this.IsEditable = isEditable
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

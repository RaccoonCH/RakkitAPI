import { IType } from '../..'

export class RId implements IType {
  TypeName: string = 'id'
  IsEditable: boolean = false
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  Format: string

  constructor(
    isInHeader: boolean = false,
    isSearchable: boolean = false,
    placeOrder: number = 0
  ) {
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

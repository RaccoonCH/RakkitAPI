import IRakkitFrontType from '../../IRakkitFrontType'

export default class RakkitFrontID implements IRakkitFrontType {
  TypeName: string = 'id'
  IsEditable: boolean = false
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  Format: string

  constructor(isInHeader: boolean = false, isSearchable: boolean = false, placeOrder: number = 0) {
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

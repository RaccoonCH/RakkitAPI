import IRakkitFrontType from '../../IRakkitFrontType'

export default class RakkitFrontObject implements IRakkitFrontType {
  TypeName: string = 'object'
  IsEditable: boolean
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  PropertyToShow: string

  constructor(propertyToShow: string, isInHeader: boolean = false, isSearchable: boolean = false, isEditable: boolean = true, placeOrder: number = 0) {
    this.PropertyToShow = propertyToShow
    this.IsEditable = isEditable
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

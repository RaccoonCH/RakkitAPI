import IRakkitFrontType from '../../IRakkitFrontType'

export default class RakkitFrontObject implements IRakkitFrontType {
  TypeName: string = 'object'
  IsEditable: boolean
  IsInHeader: boolean
  IsSearchable: boolean
  PlaceOrder: number
  Placeholder: string
  URL: string
  SizeUnit: string
  MaxSize: number

  constructor(url: string, sizeUnit: string, maxSize: number, isInHeader: boolean = false, isSearchable: boolean = false, isEditable: boolean = true, placeOrder: number = 0) {
    this.URL = url
    this.SizeUnit = sizeUnit
    this.MaxSize = maxSize
    this.IsEditable = isEditable
    this.IsInHeader = isInHeader
    this.IsSearchable = isSearchable
    this.PlaceOrder = placeOrder
  }
}

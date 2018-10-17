export default class RakkitPackage {
  ID: string
  Name: string
  Description: string
  RequiredRole: 'default' | 'super'
  Icon?: string
  Attributes: {} = {}

  constructor(description: string, icon: string = null, requiredRole: 'default' | 'super' = 'default') {
    this.Description = description
    this.Icon = icon
    this.RequiredRole = requiredRole
  }
}
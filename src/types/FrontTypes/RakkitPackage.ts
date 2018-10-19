export default class RakkitPackage {
  ID: string
  Name: string
  Description: string
  RequiredRole: 'default' | 'super'
  Icon?: string
  Attributes: {} = {}

  constructor(description: string = null, icon: string = null, requiredRole: 'default' | 'super' = 'default') {
    this.Description = description || 'A Rakkit package'
    this.Icon = icon
    this.RequiredRole = requiredRole
  }
}
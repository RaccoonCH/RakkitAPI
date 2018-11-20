export class RPackage {
  public readonly id: string
  public readonly name: string
  public readonly description: string
  public readonly requiredRole: 'default' | 'super'
  public readonly icon?: string
  public readonly attributes: {} = {}

  constructor(description: string = null, icon: string = null, requiredRole: 'default' | 'super' = 'default') {
    this.description = description || 'A Rakkit package'
    this.icon = icon
    this.requiredRole = requiredRole
  }
}

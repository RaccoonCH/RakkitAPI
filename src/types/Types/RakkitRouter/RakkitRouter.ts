import RakkitRoute from './RakkitRoute'

export default class RakkitRouter {
  private _name?: string
  private _routes: RakkitRoute[]

  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }

  public get Routes(): RakkitRoute[] {
    return this._routes
  }
  public set Routes(val: RakkitRoute[]) {
    this._routes = val
  }

  constructor(routes: RakkitRoute[])
  constructor(routes: RakkitRoute[], name: string)
  constructor(routes: RakkitRoute[], name?: string) {
    this.Name = name || null
    this.Routes = routes
  }
}

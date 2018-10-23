import { Route } from '../'

export class Router {
  private _name?: string
  private _routes: Route[]

  public get Name(): string {
    return this._name
  }
  public set Name(val: string) {
    this._name = val
  }

  public get Routes(): Route[] {
    return this._routes
  }
  public set Routes(val: Route[]) {
    this._routes = val
  }

  constructor(routes: Route[])
  constructor(routes: Route[], name: string)
  constructor(routes: Route[], name?: string) {
    this.Name = name || null
    this.Routes = routes
  }
}

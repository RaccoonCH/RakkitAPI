import { RakkitAction } from './RakkitRouterTypes'

type AcceptedMethods = 'get' | 'post' | 'put' | 'delete'

export default class RakkitRoute {
  private _method: AcceptedMethods
  private _route: string
  private _actions: RakkitAction[]

  public get Method(): AcceptedMethods {
    return this._method
  }
  public set Method(val: AcceptedMethods) {
    this._method = val
  }

  public get Route(): string {
    return this._route
  }
  public set Route(val: string) {
    this._route = val
  }

  public get Actions(): RakkitAction[] {
    return this._actions
  }
  public set Actions(val: RakkitAction[]) {
    this._actions = val
  }

  constructor(method: AcceptedMethods, route: string, action: RakkitAction)
  constructor(method: AcceptedMethods, route: string, actions: RakkitAction[])
  constructor(method: AcceptedMethods, route: string, actions: RakkitAction[] | RakkitAction) {
    this.Method = method
    this.Route = route
    this.Actions = Array.isArray(actions) ? actions : [actions]
  }
}

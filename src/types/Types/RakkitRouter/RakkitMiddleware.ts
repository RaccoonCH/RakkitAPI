import { RakkitAction } from './RakkitRouterTypes'

export default class RakkitMiddleware {
  private _before?: RakkitAction[]
  private _after?: RakkitAction[]

  public get Before(): RakkitAction[] {
    return this._before
  }
  public set Before(val: RakkitAction[]) {
    this._before = val
  }

  public get After(): RakkitAction[] {
    return this._after
  }
  public set After(val: RakkitAction[]) {
    this._after = val
  }

  constructor(before: RakkitAction, after: RakkitAction)
  constructor(before: RakkitAction[], after: RakkitAction[])
  constructor(before: RakkitAction[] | RakkitAction, after: RakkitAction[] | RakkitAction) {
    this.Before = Array.isArray(before) ? before : [before]
    this.After = Array.isArray(after) ? after : [after]
  }
}

import { Action } from '../'

export class Middleware {
  private _before?: Action[]
  private _after?: Action[]

  public get Before(): Action[] {
    return this._before
  }
  public set Before(val: Action[]) {
    this._before = val
  }

  public get After(): Action[] {
    return this._after
  }
  public set After(val: Action[]) {
    this._after = val
  }

  constructor(before: Action, after: Action)
  constructor(before: Action[], after: Action[])
  constructor(before: Action[] | Action, after: Action[] | Action) {
    this.Before = Array.isArray(before) ? before : [before]
    this.After = Array.isArray(after) ? after : [after]
  }
}

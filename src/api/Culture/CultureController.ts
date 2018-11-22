import { Query, Resolver, Args } from 'type-graphql'
import CultureModel from './CultureModel'
import { CultureGetResponse, CultureArgs } from './Types'
import { OrmInterface } from '../../class/App'

@Resolver(CultureModel)
export default class CultureController {
  private _ormInterface = new OrmInterface(CultureModel)

  //#region GraphQL
  @Query(returns => CultureGetResponse)
  cultures(@Args() args: CultureArgs) {
    return this._ormInterface.Query(args)
  }
  //#endregion

  //#region REST
  //#endregion
}

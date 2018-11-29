import { Query, Resolver, Args } from 'type-graphql'
import PageModel from './PageModel'
import { OrmInterface } from '../../class/App'
import { PageGetResponse, PageArgs } from './Types'

@Resolver(PageModel)
export default class PageController {
  private _ormInterface = new OrmInterface(PageModel)

  //#region GraphQL
  @Query(returns => PageGetResponse)
  async pages(@Args() args: PageArgs) {
    return this._ormInterface.Query({
      relations: [ 'Culture' ],
      ...args
    })
  }
  //#endregion

  //#region REST
  //#endregion
}

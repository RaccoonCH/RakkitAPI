import { Query, Resolver, Args } from 'type-graphql'
import PageModel from './PageModel'
import { OrmInterface } from '../../class/App'
import CultureModel from '../Culture/CultureModel'
import PageArgs from './PageArgs'

const pageOrmInterface = new OrmInterface(PageModel)

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  async pages(@Args() { where, skip, limit, first, last, conditionOperator, orderBy }: PageArgs) {
    const query = pageOrmInterface.ComposeQuery(where, {
      relations: [ CultureModel.name ],
      skip,
      limit,
      first,
      last,
      orderBy,
      conditionOperator
    })
    return query.getMany()
  }
  //#endregion

  //#region REST
  //#endregion
}

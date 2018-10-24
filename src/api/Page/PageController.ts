import { Query, Resolver, Args } from 'type-graphql'
import PageModel from './PageModel'
import { OrmInterface } from '../../class/App'
import CultureModel from '../Culture/CultureModel'
import PageArgs from './PageArgs'
import { Request, Response } from 'express'

const PageOrmInterface = new OrmInterface(PageModel)

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  async pages(@Args() { where, skip, limit, first, last, conditionOperator, orderBy }: PageArgs) {
    const query = PageOrmInterface.ComposeQuery(where, {
      relations: [ CultureModel.name ],
      skip,
      limit,
      first,
      last,
      orderBy,
      conditionOperator
    })
    console.log(query.getSql())
    return query.getMany()
  }
  //#endregion

  //#region REST
  static async getAll(req: Request, res: Response) {
    res.send(await PageModel.find())
  }
  //#endregion
}

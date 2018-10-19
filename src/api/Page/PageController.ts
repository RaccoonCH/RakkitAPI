import { Query, Resolver } from 'type-graphql'
import PageModel from './PageModel'

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  getAllPage() {
    return PageModel.find({relations: ['Culture']})
  }
  //#endregion

  //#region REST
  static async getAll(req, res) {
    res.send(await PageModel.find())
  }
  //#endregion
}

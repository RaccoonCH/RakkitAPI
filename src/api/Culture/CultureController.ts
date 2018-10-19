import { Query, Resolver } from 'type-graphql'
import CultureModel from './CultureModel'

@Resolver(CultureModel)
export default class CultureController {
  //#region GraphQL
  @Query(returns => [CultureModel])
  getAllCulture() {
    return CultureModel.find({relations: ['Pages']})
  }
  //#endregion

  //#region REST
  static async getAll(req, res) {
    res.send(await CultureModel.find())
  }
  //#endregion
}

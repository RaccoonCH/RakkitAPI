import { Query, Resolver } from 'type-graphql'
import CultureModel from './CultureModel'

@Resolver(CultureModel)
export default class CultureController {
  //#region GraphQL
  @Query(returns => [CultureModel])
  cultures() {
    return CultureModel.find({relations: ['Pages']})
  }
  //#endregion

  //#region REST
  //#endregion
}

import { Query, Resolver, Arg, Args, ArgsType, Field } from 'type-graphql'
import PageModel from './PageModel'
import { where, composeQuery } from '../../utils/orm-graphql-helpers'
import CultureModel from '../Culture/CultureModel'

@ArgsType()
abstract class PageArgs {
  @Field({nullable: true})
  Id: number

  @Field({nullable: true})
  Title: string

  @Field({nullable: true})
  Url: string

  @Field({nullable: true})
  Culture: CultureModel
}

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  async pages(@Args() { Id, Title, Url, Culture }: PageArgs) {
    return composeQuery(PageModel, { Id, Title, Url, Culture }).getMany()
  }
  //#endregion

  //#region REST
  static async getAll(req, res) {
    res.send(await PageModel.find())
  }
  //#endregion
}

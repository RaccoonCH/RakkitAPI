import { Query, Resolver, Arg, Args, ArgsType, Field } from 'type-graphql'
import PageModel from './PageModel'
import { composeQuery } from '../../utils/orm-graphql-helpers'
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
  CultureA: CultureModel
}

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  async pages(@Args() { Id, Title, Url, CultureA }: PageArgs) {
    return composeQuery(PageModel, {
      Id,
      Title,
      Url,
      CultureA: {
        relation: CultureModel.name,
        value: CultureA
      }
    }).getMany()
  }
  //#endregion

  //#region REST
  static async getAll(req, res) {
    res.send(await PageModel.find())
  }
  //#endregion
}

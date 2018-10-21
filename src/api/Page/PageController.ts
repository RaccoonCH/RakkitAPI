import { Query, Resolver, Arg, Args, ArgsType, Field, UseMiddleware, MiddlewareFn, Ctx } from 'type-graphql'
import PageModel from './PageModel'
import { composeQuery } from '../../utils/orm-graphql-helpers'
import CultureModel from '../Culture/CultureModel'
import ExampleModel from '../Example/ExampleModel'

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

  @Field({nullable: true})
  ExampleB: ExampleModel
}

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  async pages(@Args() { Id, Title, Url, CultureA, ExampleB }: PageArgs) {
    const query = composeQuery(PageModel, {
      Id,
      Title,
      Url,
      CultureA,
      ExampleB
    }, {
      relations: [ CultureModel.name ]
    })
    console.log(query.getSql())
    return query.getMany()
  }
  //#endregion

  //#region REST
  static async getAll(req, res) {
    res.send(await PageModel.find())
  }
  //#endregion
}

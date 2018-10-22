import { Query, Resolver, Args, ArgsType, Field, InputType } from 'type-graphql'
import PageModel from './PageModel'
import { composeQuery } from '../../utils/orm-graphql-helpers'
import CultureModel from '../Culture/CultureModel'
import ExampleModel from '../Example/ExampleModel'
import RakkitQueryArgs from '../../types/Types/RakkitGraphQL/RakkitQueryArgs'
import { Request, Response, NextFunction } from 'express';

@InputType()
class PageArgs {
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

@ArgsType()
class WherePageArgs extends RakkitQueryArgs {
  @Field(type => PageArgs, { nullable: true })
  where: PageArgs
}

@Resolver(PageModel)
export default class PageController {
  //#region GraphQL
  @Query(returns => [PageModel])
  async pages(@Args() { where, skip, limit, first, last, conditionOperator }: WherePageArgs) {
    const query = composeQuery(PageModel, where, {
      relations: [{
        select: true,
        forArg: 'CultureA',
        table: CultureModel.name
      }],
      skip,
      limit,
      first,
      last,
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

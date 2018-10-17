import { Query, Resolver } from 'type-graphql'
import TestModel from './TestModel'

@Resolver(TestModel)
export default class TestController {
  @Query(returns => [TestModel])
  getAllTest() {
    return TestModel.find()
  }

  static async getAll (req, res) {
    res.send(await TestModel.find())
  }
}

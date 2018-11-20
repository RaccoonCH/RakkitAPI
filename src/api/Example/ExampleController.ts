import ExampleModel from './ExampleModel'
import { Query, Resolver, FieldResolver, Root } from 'type-graphql'

@Resolver(ExampleModel)
export default class ExampleController {
  //#region GraphQL
  @Query(returns => [ExampleModel])
  async examples() {
    return ExampleModel.find()
  }

  @Query(returns => String)
  hello() {
    return 'okay'
  }

  // The @Root refers to the self element instance
  @FieldResolver()
  nameToUppercase2(@Root() exampleInstance: ExampleModel): string {
    return exampleInstance.Name.toLocaleUpperCase()
  }
  //#endregion

  //#region REST
  static async getOne (req, res) {
    res.send(await ExampleModel.findOne(req.params.id))
    // findOne({id: req.params.id}) works too
  }

  static async getAll (req, res) {
    res.send(await ExampleModel.find())
  }

  static async create (req, res) {
    const m = new ExampleModel(req.body.name, req.body.text)
    res.send(await m.save())
  }

  static async update (req, res) {
    const m = await ExampleModel.findOne(req.params.id)
    if (m) {
      m.Name = req.body.name
      await m.save()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }

  static async remove (req, res) {
    const m = await ExampleModel.findOne(req.params.id)
    if (m) {
      m.remove()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }
  //#endregion
}

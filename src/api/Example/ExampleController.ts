import ExampleModel from './ExampleModel'
import { Query, Resolver, FieldResolver, Root } from 'type-graphql'

@Resolver(ExampleModel)
export default class ExampleController {
  @Query(returns => [ExampleModel])
  getAllExample() {
    return ExampleModel.find()
  }

  // Add a computed field
  // Root specify that the val paramater is the current object
  @FieldResolver()
  nameToUppercase(@Root() exampleInstance: ExampleModel): string {
    return exampleInstance.name.toUpperCase()
  }

  static async getOne(req, res) {
    res.send(await ExampleModel.findOne(req.params.id))
    // findOne({id: req.params.id}) works too
  }

  static async getAll(req, res) {
    res.send(await ExampleModel.find())
  }

  static async create(req, res) {
    const m = new ExampleModel(req.body.name, req.body.text)
    res.send(await m.save())
  }

  static async update(req, res) {
    const m = await ExampleModel.findOne(req.params.id)
    if (m) {
      m.name = req.body.name
      await m.save()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }

  static async remove(req, res) {
    const m = await ExampleModel.findOne(req.params.id)
    if (m) {
      m.remove()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }
}

import Model from './ExampleModel'
import { Query, Resolver } from 'type-graphql'

@Resolver(Model)
export default class Controller {
  @Query(returns => [Model])
  getAll() {
    return Model.find()
  }

  static async getOne (req, res) {
    res.send(await Model.findOne(req.params.id))
    // findOne({id: req.params.id}) works too
  }

  static async getAll (req, res) {
    res.send(await Model.find())
  }

  static async create (req, res) {
    const m = new Model(req.body.name, req.body.text)
    res.send(await m.save())
  }

  static async update (req, res) {
    const m = await Model.findOne(req.params.id)
    if (m) {
      m.name = req.body.name
      await m.save()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }

  static async remove (req, res) {
    const m = await Model.findOne(req.params.id)
    if (m) {
      m.remove()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }
}

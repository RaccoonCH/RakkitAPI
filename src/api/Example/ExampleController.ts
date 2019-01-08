import ExampleModel from './ExampleModel'
import { Query, Resolver, FieldResolver, Root, Args, Subscription, PubSub } from 'type-graphql'
import { ExampleGetResponse, ExampleArgs, Notif } from './Types'
import { OrmInterface } from '../../class/App'
import { PubSubEngine } from 'graphql-subscriptions'

@Resolver(ExampleModel)
export default class ExampleController {
  private _ormInterface = new OrmInterface(ExampleModel)

  //#region GraphQL
  @Query(returns => ExampleGetResponse)
  async examples(@Args() args: ExampleArgs) {
    return this._ormInterface.Query(args)
  }

  @Query(returns => String)
  async hello(@PubSub() pubSub: PubSubEngine) {
    await pubSub.publish('EXAMPLE_SUB', {})
    return 'okay'
  }

  @Subscription({
    topics: 'EXAMPLE_SUB'
  })
  exampleSub(@Root() notificationPayload: Object): Notif {
    return {
      date: new Date()
    }
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

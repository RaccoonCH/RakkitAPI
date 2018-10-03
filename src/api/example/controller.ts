import { getConnection } from 'typeorm'
import model from './model'

export default {
  async getOne (req, res) {
    res.send(await model.findOne(req.params.id))
    // findOne({id: req.params.id}) works too
  },
  async getAll (req, res) {
    res.send(await model.find())
  },
  async create (req, res) {
    const m = new model(req.body.name)
    res.send(await m.save())
  },
  async update (req, res) {
    const m = await model.findOne(req.params.id)
    if (m) {
      m.name = req.body.name
      await m.save()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  },
  async remove (req, res) {
    const m = await model.findOne(req.params.id)
    if (m) {
      m.remove()
      res.send(m)
    } else {
      res.status(404).send('Item not found')
    }
  }
}

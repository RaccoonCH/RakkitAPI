import model from './model'

export default {
  async getAll (req, res) {
    res.send(await model.find())
  },
  async create (req, res) {
    const { name, real, short } = req.body
    if (name && real && short) {
      const m = new model(name, real, short)
      await m.save()
      res.send(m)
    } else {
      res.status(403).send('infos:invalid')
    }
  },
  async update (req, res) {
    const { id } = req.params
    const { name, real, short } = req.body
    if (id && name && real && short) {
      const m = await model.findOne(id)
      if (m) {
        m.name = name
        m.real = real
        m.short = short
        await m.save()
        res.send(m)
      }
    } else {
      res.status(403).send('infos:invalid')
    }
  }
}

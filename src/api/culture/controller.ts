import model from './model'
import Lang from '../lang/model'

export default {
  async getAll (req, res) {
    res.send(await model.find({relations: ['lang']}))
  },
  async create (req, res) {
    const { name, langID } = req.body
    if (name && langID) {
      const lang = await Lang.findOne(langID)
      if (lang) {
        const m = new model(name, lang)
        await m.save()
        res.send(m)
      } else {
        res.status(404).send('lang:notfound')
      }
    } else {
      res.status(403).send('infos:invalid')
    }
  },
  async update (req, res) {
    const { id } = req.params
    const { name, langID } = req.body
    if (id && name && langID) {
      const m = await model.findOne(id)
      if (m) {
        const lang = await Lang.findOne(langID)
        if (lang) {
          m.name = name
          m.lang = lang
          await m.save()
          res.send(m)
        } else {
          res.status(404).send('lang:notfound')
        }
      } else {
        res.status(404).send('culture:notfound')
      }
    } else {
      res.status(403).send('infos:invalid')
    }
  }
}

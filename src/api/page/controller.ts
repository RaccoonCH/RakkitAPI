import Page from './Models/Page'
import Culture from '../culture/model'
import PageContent from './Models/PageContent'

export default {
  async getAll (req, res) {
    res.send(await PageContent.find({relations: ['page', 'culture', 'culture.lang']}))
  },
  async create (req, res) {
    const { name, content, model, cultureID } = req.body
    if (name && content && model && cultureID) {
      const culture = await Culture.findOne(cultureID, { relations: ['lang'] })
      if (culture) {
        const page = new Page(name, model)
        const pageContent = new PageContent(culture, content, page)
        await page.save()
        await pageContent.save()
        res.send(pageContent)
      }
    } else {
      res.status(403).send('infos:invalid')
    }
  },
  /*
  async update (req, res) {
    const { id } = req.params
    const { name, content, model, cultureID } = req.body
    if (id && content && model && cultureID) {
      const page = await Page.findOne(id)
      const culture = await Culture.findOne(cultureID)
      const pageContent = await PageContent.findOne({ relations: ['page', 'culture'], where: {pageId: id, cultureId: cultureID}})
      console.log(culture, page, pageContent)
      if (pageContent) {
        if (culture) {
          page.name = name
          page.model = model
          pageContent.content = content
          pageContent.culture = culture
          await pageContent.save()
          await page.save()
          res.send(pageContent)
        } else {
          res.status(404).send('culture:notfound')
        }
      } else {
        res.status(404).send('page-content:notfound')
      }
    } else {
      res.status(403).send('infos:invalid')
    }
  }
  */
}

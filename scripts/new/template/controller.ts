import model from './model'

export default {
  async getAll (req, res) {
    res.send(await model.find())
  }
}

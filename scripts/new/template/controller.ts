import { getConnection } from 'typeorm'
import model from './model'

export default {
  async getAll (req, res) {
    res.send(model.find())
  }
}

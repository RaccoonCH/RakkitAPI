import { getConnection } from 'typeorm'
import model from './model'

export default {
  async getAll (req, res) {
    await getConnection().createQueryBuilder(model).getMany()
  }
}

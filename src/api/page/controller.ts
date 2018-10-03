import { getConnection } from 'typeorm'
import model from './model'

export default {
  async hello (req, res) {
    const res2 = await getConnection().createQueryBuilder().insert().into(model).values({
      test: 'test'
    }).execute()
    console.log('Inserted')
    res.send('Hello World')
  }
}

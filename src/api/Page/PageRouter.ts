import PageController from './PageController'
import RakkitRouter from '../../types/Types/RakkitRouter/RakkitRouter'
import RakkitRoute from '../../types/Types/RakkitRouter/RakkitRoute'

export default new RakkitRouter([
  new RakkitRoute('get', '/', PageController.getAll)
])

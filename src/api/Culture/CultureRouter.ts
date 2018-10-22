import CultureController from './CultureController'
import RakkitRouter from '../../types/Types/RakkitRouter/RakkitRouter'
import RakkitRoute from '../../types/Types/RakkitRouter/RakkitRoute'

export default new RakkitRouter([
  new RakkitRoute('get', '/', CultureController.getAll)
])

import ExampleController from './ExampleController'
import RakkitRouter from '../../types/Types/RakkitRouter/RakkitRouter'
import RakkitRoute from '../../types/Types/RakkitRouter/RakkitRoute'

export default new RakkitRouter([
  new RakkitRoute('get', '/', ExampleController.getAll),
  new RakkitRoute('get', '/:id', ExampleController.getOne),
  new RakkitRoute('post', '/', ExampleController.create),
  new RakkitRoute('put', '/:id', ExampleController.update),
  new RakkitRoute('delete', '/:id', ExampleController.remove)
])

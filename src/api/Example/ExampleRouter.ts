import ExampleController from './ExampleController'
import { Router, Route } from '../../class/app'

export default new Router([
  new Route('get', '/', ExampleController.getAll),
  new Route('get', '/:id', ExampleController.getOne),
  new Route('post', '/', ExampleController.create),
  new Route('put', '/:id', ExampleController.update),
  new Route('delete', '/:id', ExampleController.remove)
])

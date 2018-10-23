import PageController from './PageController'
import { Route, Router } from '../../class/app'

export default new Router([
  new Route('get', '/', PageController.getAll)
])

import PageController from './PageController'
import { Route, Router } from '../../class/App'

export default new Router([
  new Route('get', '/', PageController.getAll)
])

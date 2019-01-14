import SystemController from './SystemController'
import { Router, Route } from '../../class/App'

export default new Router([
  new Route('get', '/restart', SystemController.restart)
])

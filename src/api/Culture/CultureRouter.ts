import CultureController from './CultureController'
import { Router, Route } from '../../class/App'

export default new Router([
  new Route('get', '/', CultureController.getAll)
])

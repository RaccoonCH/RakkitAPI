import CultureController from './CultureController'
import { Router, Route } from '../../class/app'

export default new Router([
  new Route('get', '/', CultureController.getAll)
])

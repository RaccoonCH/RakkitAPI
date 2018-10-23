import _CONTROLLER_FILE_ from './_CONTROLLER_FILE_'
import { Router, Route } from '../../class/app'

export default new Router([
  new Route('get', '/', _CONTROLLER_FILE_.getAll)
])

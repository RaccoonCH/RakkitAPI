import controller from './controller'

export default [
  ['get', '/', controller.getAll],
  ['get', '/:id', controller.getOne],
  ['post', '/', controller.create],
  ['put', '/:id', controller.update],
  ['delete', '/:id', controller.update]
]

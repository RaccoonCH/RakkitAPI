import controller from './controller'

export default [
  ['get', '/', controller.getAll],
  ['post', '/', controller.create],
  ['put', '/:id', controller.update]
]

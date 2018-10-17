import Controller from './controller'

export default [
  ['get', '/', Controller.getAll],
  ['get', '/:id', Controller.getOne],
  ['post', '/', Controller.create],
  ['put', '/:id', Controller.update],
  ['delete', '/:id', Controller.update]
]

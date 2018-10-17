import ExampleController from './ExampleController'

export default [
  ['get', '/', ExampleController.getAll],
  ['get', '/:id', ExampleController.getOne],
  ['post', '/', ExampleController.create],
  ['put', '/:id', ExampleController.update],
  ['delete', '/:id', ExampleController.update]
]

import controller from './controller'

export default [
  {
    method: 'get',
    route: '/',
    functions: controller.hello
  }
]

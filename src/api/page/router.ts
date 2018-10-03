import controller from './page/controller'

export default [
  {
    method: 'get',
    route: '/',
    functions: controller.hello
  }
]

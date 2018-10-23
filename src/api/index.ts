import { Router as ExpressRouter, Request, Response } from 'express'
import color from '../utils/color'
import { scanDirSync, fileExistsSync, getFilePath } from '../utils/file'
import { RPackage, IType } from './../class/FrontTypes'
import { Middleware, Router, Route, Action } from '../class/app'

//#region RP decorators
const RPs: RPackage[] = []
let RPsAttributes: Object = {}

/**
 * Declare a RakkitPackge to show into front-end
 * It always called after Attribute decorator
 * @param rakkitPackage The RakkitPackage object with informations (description, icon, ...)
 */
export const Package = (rakkitPackage: RPackage): Function => {
  return (target: Function): void => {
    const className = target.name.toLowerCase()
    RPs.push({
      ID: className,
      Name: target.name,
      ...rakkitPackage,
      Attributes: RPsAttributes[className],
    })
  }
}

/**
 * Pupulate the attributes into an object, it's a temp variable because it's called before Package decorator
 * It always called before Package decorator
 * @param type The front-end type, it describe how the datas will be displayed
 */
export const Attribute = (type: IType): Function => {
  return (target: Object, key: string): void => {
    const className = target.constructor.name.toLowerCase()
    if (!RPsAttributes[className]) {
      RPsAttributes[className] = {}
    }
    RPsAttributes[className][key] = type
  }
}
//#endregion

const getRPObjectPath = (rpName: string, objectName: string): string => {
  return getFilePath(rpName, rpName + objectName.charAt(0).toLocaleUpperCase() + objectName.slice(1).toLocaleLowerCase())
}
const resolvers: Function[] = []
const router = ExpressRouter()

/**
 * It scan all dir into the API folder (each dir represent a RakkitPackage)
 * It automaticaly includes router, and middleware into the api
 * Each RakkitPackage is accessible with his endpoint
 * Example with a RakkitPackage named: Page
 * .../api/Page/myRouteDeclaredIntoTheRouter
 */
scanDirSync(__dirname, (file: string) => {
  const routerFile = getRPObjectPath(file, 'router')
  const controllerFile = getRPObjectPath(file, 'controller')
  const middlewareFile = getRPObjectPath(file, 'middleware')

  if (fileExistsSync(__dirname, controllerFile)) {

    // If the controller file exists, add the class into resolvers for type-graphql
    fileExistsSync(__dirname, controllerFile) && resolvers.push(require(controllerFile).default)

    if (fileExistsSync(__dirname, routerFile)) {
      // Load middlewares if middleware file exists
      const middlewares: Middleware = fileExistsSync(__dirname, middlewareFile) && require(middlewareFile).default
      
      // Import router config file and create a new Express router to parse the config file into an Express Router
      const rakkitRouter: Router = require(routerFile).default
      const expressRouter = ExpressRouter()

      // Load "before" middlewares
      middlewares.Before && middlewares.Before.forEach((rakkitBeforeMiddleware: Action) => expressRouter.use(rakkitBeforeMiddleware))

      // Parsing the Router config file into the Express Router object
      // It's possible to declare routes with an Array or an Object: {method: string, route: string, functions: Function[] | Function}
      rakkitRouter.Routes.forEach((rakkitRouter: Route) => {
        // apiRouter.get('/...', () => {...})
        expressRouter[rakkitRouter.Method](rakkitRouter.Route, ...rakkitRouter.Actions)
      })

      // Load "after" middlewares
      middlewares.After && middlewares.After.forEach((rakkitAfterMiddleware: Action) => expressRouter.use(rakkitAfterMiddleware))

      // Import API with the right route name .../api/page (for example)
      router.use(`/${rakkitRouter.Name || file.toLocaleLowerCase()}`, expressRouter)
    }

    console.log('✅  RP:', color(`${file.toLocaleLowerCase()}`, 'fg.green'))
  } else {
    console.log(`❌  RP: ${file} - ` + color('the controller is required', 'fg.red'))
  }
})

// Get all RakkitPackage objects
router.get('/', (req: Request, res: Response) => res.send(RPs))

export default { router, resolvers }

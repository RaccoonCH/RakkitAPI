import { Router, Express } from 'express'
import color from '../utils/color'
import { scanDirSync, fileExistsSync, getFilePath } from '../utils/file'
import RakkitPackage from './../types/FrontTypes/RakkitPackage'
import IRakkitType from '../types/FrontTypes/IRakkitFrontType'
const router = Router()

//#region RP decorators
const RPs: RakkitPackage[] = []
let RPsAttributes: Object = {}

/**
 * Declare a RakkitPackge to show into front-end
 * It always called after Attribute decorator
 * @param rPackage The RakkitPackage object with informations (description, icon, ...)
 */
export const Package = (rPackage: RakkitPackage) => {
  return (target: Function) => {
    const className = target.name.toLowerCase()
    RPs.push({
      ID: className,
      Name: target.name,
      ...rPackage,
      Attributes: RPsAttributes[className],
    })
  }
}

/**
 * Pupulate the attributes into an object, it's a temp variable because it's called before Package decorator
 * It always called before Package decorator
 * @param type The front-end type, it describe how the datas will be displayed
 */
export const Attribute = (type: IRakkitType) => {
  return (target: Object, key: string) => {
    const className = target.constructor.name.toLowerCase()
    if (!RPsAttributes[className]) {
      RPsAttributes[className] = {}
    }
    RPsAttributes[className][key] = type
  }
}
//#endregion

const getRPObjectPath = (rpName: string, objectName: string) => {
  return getFilePath(rpName, rpName + objectName.charAt(0).toLocaleUpperCase() + objectName.slice(1).toLocaleLowerCase())
}

const resolvers: Function[] = []

/**
 * It scan all dir into the API folder (each dir represent a RakkitPackage)
 * It automaticaly includes router, and middleware into the api
 * Each RakkitPackage is accessible with his endpoint
 * Example with a RakkitPackage named: Page
 * .../api/Page/myRouteDeclaredIntoTheRouter
 */
scanDirSync(__dirname, (file: string) => {
  // Run before api import
  const routerFile = getRPObjectPath(file, 'router')
  const controllerFile = getRPObjectPath(file, 'controller')
  const middlewareFile = getFilePath(file, 'middleware')
  if (fileExistsSync(__dirname, routerFile)) {
    // If the controller file exists, add the class into resolvers for type-graphql
    fileExistsSync(__dirname, controllerFile) && resolvers.push(require(controllerFile).default)

    // Load middlewares if middleware file exists
    const middlewares = fileExistsSync(__dirname, middlewareFile) && require(middlewareFile).default
    
    // Import router config file and create a new Express router to parse the config file into an Express Router
    const apiRouterConfig = require(routerFile).default
    const apiRouter = Router()

    // Load "before" middlewares
    middlewares.before && middlewares.before.forEach(mw => apiRouter.use(mw))
  
    // Parsing the Router config file into the Express Router object
    // It's possible to declare routes with an Array or an Object: {method: string, route: string, functions: Function[] | Function}
    apiRouterConfig.forEach(r => {
      const list = Array.isArray(r)
      const method = r[list ? 0 : 'method'].toLowerCase()
      const route = r[list ? 1 : 'route'] 
      let functions = r[list ? 2 : 'functions']
      functions = Array.isArray(functions) ? functions : [functions]
      apiRouter[method](route, ...functions)
    })
  
    // Load "after" middlewares
    middlewares.after && middlewares.after.forEach(mw => apiRouter.use(mw))
  
    // Import API with the right route name .../api/page (for example)
    router.use(`/${file.toLocaleLowerCase()}`, apiRouter)
    console.log('✅  API:', color(`${file.toLocaleLowerCase()}`, 'fg.green'))
  } else {
    console.log(`❌  API: ${file} - ` + color('router.ts is required', 'fg.red'))
  }
})

// Get all RakkitPackage objects
router.get('/', (req, res) => res.send(RPs))

export default { router, resolvers }

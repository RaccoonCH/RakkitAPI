import { Router as ExpressRouter } from 'express'
import { Color } from '../../../misc'
import { Middleware, Router, Route, Action, FileUtils } from '..'
import * as path from 'path'

export class AppLoader {
  private _apiPath: string
  private _filesExtenstion: string = 'ts'
  private _resolvers: Function[] = []
  private _appFileUtil: FileUtils
  private _expressRouter: ExpressRouter = ExpressRouter()
  private _rpNames: string[] = []

  public get RpNames(): string[] {
    return this._rpNames
  }

  public get ApiPath(): string {
    return this._apiPath
  }

  public get FilesExtension(): string {
    return this._filesExtenstion
  }

  public get Resolvers(): Function[] {
    return this._resolvers
  }

  public get ExpressRouter(): ExpressRouter {
    return this._expressRouter
  }

  private get AppFileUtil(): FileUtils {
    return this._appFileUtil
  }

  constructor()
  constructor(apiPath: string)
  constructor(filesExtension: string)
  constructor(apiPath: string, filesExtension: string)
  constructor(apiPath?: string, filesExtension?: string) {
    if (filesExtension) {
      this._filesExtenstion = filesExtension
    }
    this._appFileUtil = new FileUtils(apiPath || 'api')
  }

  /**
   * Get the RakkitPackageObject absolute path from the root dir
   * @param rpName The RakkitPackage name
   * @param rpObjectName The RakkitPackageObject name (controller, router, model, args, ...)
   */
  private getRpObjectPath(rpName: string, rpObjectName: string): string {
    return this.AppFileUtil.GetFilePath(
      path.join(rpName, `${rpName + rpObjectName.charAt(0).toLocaleUpperCase() + rpObjectName.slice(1).toLocaleLowerCase()}.${this.FilesExtension}`)
    )
  }

  /**
   * It scan all dir into the API folder (each dir represent a RakkitPackage)
   * It automaticaly includes router, and middleware into the api
   * Each RakkitPackage is accessible with his endpoint
   * Example with a RakkitPackage named: Page
   * .../api/Page/myRouteDeclaredIntoTheRouter
   */
  Load()
  Load(RpName: string)
  Load(RpName?: string): void {
    const LoadRp = (RpName: string): void => {
      this.RpNames.push(RpName)

      const routerFile = this.getRpObjectPath(RpName, 'router')
      const controllerFile = this.getRpObjectPath(RpName, 'controller')
      const middlewareFile = this.getRpObjectPath(RpName, 'middleware')

      if (this.AppFileUtil.FileExists(controllerFile)) {

        // If the controller file exists, add the class into resolvers for type-graphql
        this.AppFileUtil.FileExists(controllerFile) && this.Resolvers.push(require(controllerFile).default)

        if (this.AppFileUtil.FileExists(routerFile)) {
          // Load middlewares if middleware file exists
          const middlewares: Middleware = this.AppFileUtil.FileExists(middlewareFile) && require(middlewareFile).default

          // Import router config file and create a new Express router to parse the config file into an Express Router
          const rakkitRouter: Router = require(routerFile).default
          const apiRouter = ExpressRouter()

          // Load "before" middlewares
          middlewares.Before && middlewares.Before.forEach((rakkitBeforeMiddleware: Action) => apiRouter.use(rakkitBeforeMiddleware))

          // Parsing the Router config file into the Express Router object
          // It's possible to declare routes with an Array or an Object: {method: string, route: string, functions: Function[] | Function}
          rakkitRouter.Routes.forEach((rakkitRouter: Route) => {
            // apiRouter.get('/...', () => {...})
            apiRouter[rakkitRouter.Method](rakkitRouter.Route, ...rakkitRouter.Actions)
          })

          // Load "after" middlewares
          middlewares.After && middlewares.After.forEach((rakkitAfterMiddleware: Action) => apiRouter.use(rakkitAfterMiddleware))

          // Import API with the right route name .../api/page (for example)
          this.ExpressRouter.use(`/${rakkitRouter.Name || RpName.toLocaleLowerCase()}`, apiRouter)
        }

        console.log('✅  RP:', Color(`${RpName.toLocaleLowerCase()}`, 'fg.green'))
      } else {
        console.log(`❌  RP: ${RpName} - ${Color('the controller is required', 'fg.red')}`)
      }
    }
    if (RpName) {
      // Load a single RakkitPackage
      LoadRp(RpName)
    } else {
      // Load all RakkitPackage
      this.AppFileUtil.ScanDir(LoadRp)
    }
  }
}

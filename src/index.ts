import 'reflect-metadata'
import * as Path from 'path'
import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as Cors from 'cors'
import * as TypeGraphQL from 'type-graphql'
import { getConnectionOptions, createConnection } from 'typeorm'
import { createServer, Server } from 'http'
import { Color } from './misc'
import { ApolloServer } from 'apollo-server-express'
import { AppLoader } from './class/App'
import { RPackage, IType } from './class/FrontTypes'

class Main {
  private _host: string
  private _port: number
  private _apiEndpoint: string
  private _apiPath: string
  private _expressApp: Express.Express
  private _httpServer: Server
  private _publicPath: string
  private _mainAppLoader: AppLoader
  private _apolloServer?: ApolloServer
  private _corsEnabled?: boolean
  private _rps: RPackage[] = []
  private _rpsAttributes: Object = {}

  constructor()
  constructor(corsEnabled: boolean)
  constructor(corsEnabled: boolean, host: string, port: number, publicPath: string, apiPath: string, apiEndpoint: string)
  constructor(corsEnabled?: boolean, host?: string, port?: number, publicPath?: string, apiPath?: string, apiEndpoint?: string) {
    this._corsEnabled = corsEnabled || true
    this._host = host || 'localhost'
    this._port = port || 4000
    this._apiEndpoint = apiEndpoint || '/api'
    this._publicPath = publicPath || Path.join(__dirname, '../public')
    this._apiPath = apiPath || Path.join(__dirname, 'api')
    this._expressApp = Express()
    this._httpServer = createServer(this._expressApp)
    this._mainAppLoader = new AppLoader(this._apiPath)
  }

  /**
   * Start the application (Express, GraphQL, ...)
   */
  Start(): void {
    // Get ormconfig.ts file content and create the connection to the database
    getConnectionOptions().then(createConnection).catch(console.error)

    // Load the application (all RakkitPackage)
    this._mainAppLoader.Load()

    this._mainAppLoader.ExpressRouter.use('/', (req, res) => res.send(this._rps))

    if (this._corsEnabled) {
      this._expressApp.use(Cors())
    }
    this._expressApp.use(BodyParser.urlencoded({extended: false}))
    this._expressApp.use(BodyParser.json())

    // Server the public folder to be served as a static folder
    this._expressApp.use('/', Express.static(this._publicPath))

    // Load the api returned router into the /api route
    this._expressApp.use(this._apiEndpoint, this._mainAppLoader.ExpressRouter)

    // Build TypeGraphQL schema to use it
    TypeGraphQL.buildSchema({
      resolvers: this._mainAppLoader.Resolvers
    }).then((schema) => {
      this._apolloServer = new ApolloServer({ schema })
      this._apolloServer.applyMiddleware({ app: this._expressApp })
      console.log(Color(
        `\nGraphQL: Started on http://${this._host}:${this._port}${this._apolloServer.graphqlPath}`,
        'fg.black', 'bg.green'
      ))
    }).catch(console.error)

    // Ignore the host value error
    // @ts-ignore
    this._httpServer.listen(this._port, this._host, () => {
      console.log(Color(
        `Express: Started on http://${this._host}:${this._port}${this._apiEndpoint}\n`,
        'fg.black', 'bg.green'
      ))
    })
  }

  /**
   * Add the rakkitPackage to the RP list to provide it
   * @param rp The RPackage passed in params into the decorator
   */
  addRp(rp: RPackage): void {
    this._rps.push({
      ...rp,
      Attributes: this._rpsAttributes[rp.Id]
    })
  }

  /**
   * This function is called by the Attributes decorator
   * /!\ It's called before addRp
   * @param className the classname that call the function
   * @param key the property name
   * @param rakkitFrontType the parameter in the decorator parameter
   */
  addRpAttribute(className: string, key: string, rakkitFrontType: IType): void {
    if (!this._rpsAttributes[className]) {
      this._rpsAttributes[className] = {}
    }
    this._rpsAttributes[className][key] = rakkitFrontType
  }
}

export const mainApp = new Main()
mainApp.Start()

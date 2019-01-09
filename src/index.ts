import 'reflect-metadata'
import * as Path from 'path'
import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as Cors from 'cors'
import * as TypeGraphQL from 'type-graphql'
import * as jwt from 'express-jwt'
import { GetableUser } from './api/User/Types/GetableUser'
import { config } from 'dotenv'
import { getConnectionOptions, createConnection } from 'typeorm'
import { createServer, Server } from 'http'
import { Color } from './misc'
import { ApolloServer } from 'apollo-server-express'
import { AppLoader } from './class/App'
import { IPackage, Type, TypeParams } from './class/FrontTypes'
import { GraphQLSchema, subscribe, execute } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { IMain } from './class/Types'

config({ path: '../.env' })

export class Main extends AppLoader {
  private _host: string
  private _port: number
  private _restEndpoint: string
  private _graphqlEndpoint: string
  private _expressApp: Express.Express
  private _publicPath: string
  private _subscriptionServer: SubscriptionServer
  private _httpServer: Server
  private _apolloServer?: ApolloServer
  private _corsEnabled?: boolean
  private _rps: IPackage[] = []
  private _rpsAttributes: Map<string, Array<TypeParams & Type>> = new Map()
  private static _instance: Main

  public static get Instance(): Main {
    return this._instance
  }

  private constructor(params: IMain) {
    super(params.apiPath || Path.join(__dirname, 'api'))
    this._corsEnabled = params.corsEnabled || true
    this._host = params.host || 'localhost'
    this._port = params.port || 4000
    this._restEndpoint = params.restEndpoint || '/rest'
    this._graphqlEndpoint = params.graphqlEndpoint || '/gql'
    this._publicPath = params.publicPath || Path.join(__dirname, '../public')
    this._expressApp = Express()
    this._httpServer = createServer(this._expressApp)
  }

  /**
   * Start the application (Express, GraphQL, ...)
   */
  public static async start(params?: IMain): Promise<Main> {
    if (!this.Instance) {
      this._instance = new Main(params || {})
    }
    try {
      // Get ormconfig.ts file content and create the connection to the database
      await createConnection(await getConnectionOptions())
      // Start Rest service and GraphQL
      await this.Instance.startAllServices()
    } catch (err) {
      console.log(err)
    }
    return this.Instance
  }

  private async startAllServices(): Promise<Main> {
    await this.startRest()
    await this.startGraphQl()
    return this
  }

  private async startRest(): Promise<Main> {
    return new Promise((resolve, reject) => {
      // Load the application (all RakkitPackage)
      this.Load()
      this.ExpressRouter.use('/', (req, res) => {
        res.send(this._rps)
      })

      if (this._corsEnabled) {
        this._expressApp.use(Cors())
      }
      this._expressApp.use(BodyParser.urlencoded({extended: false}))
      this._expressApp.use(BodyParser.json())

      // Server the public folder to be served as a static folder
      this._expressApp.use('/', Express.static(this._publicPath))

      // Load the api returned router into the /[restEndpoint] route
      this._expressApp.use(this._restEndpoint, this.ExpressRouter)

      // Use jwt auth middleware
      this._expressApp.use(jwt({
        secret: process.env.SecretKey,
        credentialsRequired: false
      }))

      // Invalid token error response
      this._expressApp.use((err: Express.ErrorRequestHandler, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        if (err.name === 'UnauthorizedError') {
          res.status(401).send('unauthorized')
        } else {
          next()
        }
      })

      this._httpServer.listen(this._port, this._host, () => {
        console.log(Color(
          `REST:     Started on http://${this._host}:${this._port}${this._restEndpoint}`,
          'fg.black', 'bg.green'
        ))
        resolve(this)
      })
    })
  }

  private async startGraphQl(): Promise<Main> {
    // Build TypeGraphQL schema to use it
    const schema: GraphQLSchema = await TypeGraphQL.buildSchema({
      resolvers: this.Resolvers,
      authChecker: ({ context }, roles) =>  {
        const user: GetableUser = context.req.user
        if (user) {
          const authorizedRole: Array<string> = (roles.length <= 0 ? [ process.env.DefaultRequiredRole ] : roles)
          return authorizedRole.includes(user.Role)
        }
        return false
      }
    })
    this._apolloServer = new ApolloServer({
      schema,
      subscriptions: {
        path: this._graphqlEndpoint
      },
      context: ({ req }) => {
        return {
          req,
          user: req.user // from express-jwt
        }
      }
    })
    this._apolloServer.applyMiddleware({
      app: this._expressApp,
      path: this._graphqlEndpoint
    })

    this._subscriptionServer = new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: this._httpServer,
      path: this._graphqlEndpoint
    })

    console.log(Color(
      `GraphQL:  Started on http://${this._host}:${this._port}${this._apolloServer.graphqlPath}\n`,
      'fg.black', 'bg.green'
    ))

    return this
  }

  /**
   * Restart REST and GraphQL service
   */
  public async Restart() {
    return this.startAllServices()
  }

  /**
   * Add the rakkitPackage to the RP list to provide it
   * @param rp The RPackage passed in params into the decorator
   */
  public AddRp(rp: IPackage): Main {
    this._rps.push({
      ...rp,
      attributes: this._rpsAttributes.get(rp.className)
    })
    return this
  }

  /**
   * This function is called by the Attributes decorator
   * /!\ It's called before addRp
   * @param className the classname that call the function
   * @param key the property name
   * @param rakkitFrontType the parameter in the decorator parameter
   */
  public AddRpAttribute(
    className: string,
    key: string,
    rakkitFrontType: Type,
    rakkitAttributeParams: TypeParams
  ): Main {
    const rpAttributes = this._rpsAttributes.get(className) || []
    rpAttributes.push({
      name: key,
      ...rakkitAttributeParams,
      ...rakkitFrontType
    })
    this._rpsAttributes.set(className, rpAttributes)
    return this
  }
}

Main.start()

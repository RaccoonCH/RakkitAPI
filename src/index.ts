import { GetableUser } from './api/User/Types/GetableUser'
import 'reflect-metadata'
import { config } from 'dotenv'
import * as Path from 'path'
import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as Cors from 'cors'
import * as TypeGraphQL from 'type-graphql'
import * as jwt from 'express-jwt'
import { getConnectionOptions, createConnection } from 'typeorm'
import { createServer, Server } from 'http'
import { Color } from './misc'
import { ApolloServer } from 'apollo-server-express'
import { AppLoader } from './class/App'
import { IPackage, Type, TypeParams } from './class/FrontTypes'
import { GraphQLSchema, subscribe, execute } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

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

  constructor()
  constructor(corsEnabled: boolean)
  constructor(corsEnabled: boolean, host: string, port: number, publicPath: string, apiPath: string, apiEndpoint: string, graphqlEndpoint: string)
  constructor(
    corsEnabled?: boolean,
    host?: string,
    port?: number,
    publicPath?: string,
    apiPath?: string,
    restEndpoint?: string,
    graphqlEndpoint?: string
  ) {
    super(apiPath || Path.join(__dirname, 'api'))
    this._corsEnabled = corsEnabled || true
    this._host = host || 'localhost'
    this._port = port || 4000
    this._restEndpoint = restEndpoint || '/rest'
    this._graphqlEndpoint = graphqlEndpoint || '/gql'
    this._publicPath = publicPath || Path.join(__dirname, '../public')
    this._expressApp = Express()
    this._httpServer = createServer(this._expressApp)
  }

  /**
   * Start the application (Express, GraphQL, ...)
   */
  async Start(): Promise<void> {
    try {
      // Get ormconfig.ts file content and create the connection to the database
      await createConnection(await getConnectionOptions())

      // Load the application (all RakkitPackage)
      this.Load()
      this.ExpressRouter.use('/', (req, res) => {
        if (this.RpNames.length === this._rps.length) {
          res.send(this._rps)
        } else {
          res.status(404).send('loading')
        }
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
        `\nGraphQL:  Started on http://${this._host}:${this._port}${this._apolloServer.graphqlPath}`,
        'fg.black', 'bg.green'
      ))

      this._httpServer.listen(this._port, this._host, () => {
        console.log(Color(
          `REST:     Started on http://${this._host}:${this._port}${this._restEndpoint}\n`,
          'fg.black', 'bg.green'
        ))
      })
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Add the rakkitPackage to the RP list to provide it
   * @param rp The RPackage passed in params into the decorator
   */
  public AddRp(rp: IPackage): void {
    this._rps.push({
      ...rp,
      attributes: this._rpsAttributes.get(rp.className)
    })
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
  ): void {
    const rpAttributes = this._rpsAttributes.get(className) || []
    rpAttributes.push({
      name: key,
      ...rakkitAttributeParams,
      ...rakkitFrontType
    })
    this._rpsAttributes.set(className, rpAttributes)
  }
}

config({ path: '../.env' })

export const mainInstance = new Main()
mainInstance.Start()

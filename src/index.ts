import 'reflect-metadata'
import * as Path from 'path'
import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as Cors from 'cors'
import * as TypeGraphQL from 'type-graphql'
import { getConnectionOptions, createConnection} from 'typeorm'
import { createServer } from 'http'
import { Color } from './utils'
import { ApolloServer } from 'apollo-server-express'
import { AppLoader } from './class/app'
import { RPackage, IType } from './class/FrontTypes'

// All RakkitPackages informations are stored in the RPs variable
const rps: RPackage[] = []
const rpsAttributes: Object = {}

// This function is called by the Package decorator
export const addRp = (rp: RPackage): void => {
  rps.push({
    ...rp,
    Attributes: rpsAttributes[rp.Id]
  })
}

// This function is called by the Attributes decorator
export const addRpAttribute = (className: string, key: string, rakkitFrontType: IType): void => {
  if (!rpsAttributes[className]) {
    rpsAttributes[className] = {}
  }
  rpsAttributes[className][key] = rakkitFrontType
}

// Load the application (all RakkitPackage)
const mainAppLoader = new AppLoader(Path.join(__dirname, 'api'))
mainAppLoader.Load()

// Provide all RakkitPackage informations by accessing to the /api route
mainAppLoader.ExpressRouter.use('/', (req, res) => res.send(rps))

// Get ormconfig.ts file content and create the connection to the database
getConnectionOptions().then(createConnection).catch(console.error)

const host = 'localhost'
const port = 4000
const apiPath = '/api'
const app = Express()
const server = createServer(app)

app.use(Cors())
app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())

// Server the public folder to be served as a static folder
app.use('/', Express.static(Path.join(__dirname, '../public')))

// Load the api returned router into the /api route
app.use(apiPath, mainAppLoader.ExpressRouter)

// Build TypeGraphQL schema to use it
TypeGraphQL.buildSchema({
  resolvers: mainAppLoader.Resolvers
}).then((schema) => {
  const apolloServer = new ApolloServer({ schema })
  apolloServer.applyMiddleware({ app })
  console.log(Color(
    `\nGraphQL: Started on http://${host}:${port}${apolloServer.graphqlPath}`,
    'fg.black', 'bg.green'
  ))
}).catch(console.error)

// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
  console.log(Color(
    `Express: Started on http://${host}:${port}${apiPath}\n`,
    'fg.black', 'bg.green'
  ))
})

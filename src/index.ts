import 'reflect-metadata'
import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { getConnectionOptions, createConnection} from 'typeorm'
import { createServer } from 'http'
import color from './utils/color'
import * as TypeGraphQL from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'
import api from './api'

// Get ormconfig.ts file content and create the connection to the database
getConnectionOptions().then(createConnection).catch(console.error)

const host = 'localhost'
const port = 4000
const apiUrl = '/api'

const app = express()
const server = createServer(app)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Server the public folder to be served as a static folder
app.use('/', express.static(path.join(__dirname, '../public')))

// Load the api returned router into the /api route
app.use(apiUrl, api.router)

// Build TypeGraphQL schema to use it
TypeGraphQL.buildSchema({
  resolvers: api.resolvers
}).then((schema) => {
  const apolloServer = new ApolloServer({schema})
  apolloServer.applyMiddleware({app})
  console.log(color(`\nGraphQL: Started on http://${host}:${port}${apolloServer.graphqlPath}`, 'fg.black', 'bg.green'))
}).catch(console.error)

// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
  console.log(color(`Express: Started on http://${host}:${port}${apiUrl}\n`, 'fg.black', 'bg.green'))
})


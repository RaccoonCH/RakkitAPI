import 'reflect-metadata'
import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { getConnectionOptions, createConnection} from 'typeorm'
import { createServer } from 'http'
import { color } from './utils/color'
import api from './api'
import cultureResolver from './api/culture/resolver'
import * as typeGQL from 'type-graphql'
import { ApolloServer, gql } from 'apollo-server-express'

getConnectionOptions().then(createConnection).catch(console.error)

const host = 'localhost'
const port = 4000

const app = express()
const server = createServer(app)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/api', api)

typeGQL.buildSchema({
  resolvers: [cultureResolver]
}).then((schema) => {
  const apolloServer = new ApolloServer({schema})
  apolloServer.applyMiddleware({app})
  console.log(color(`\nGraphQL: Started on http://${host}:${port}${apolloServer.graphqlPath}`, 'fg.black', 'bg.green'))
}).catch(console.error)



// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
  console.log(color(`Express: Started on http://${host}:${port}\n`, 'fg.black', 'bg.green'))
})


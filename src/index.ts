import * as path from 'path'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import { createServer } from 'http'
import api from './api'

const host = 'localhost'
const port = 4000

const app = express()
const server = createServer(app)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/api', api)

// Ignore the host value error
// @ts-ignore
server.listen(port, host, () => {
  console.log(`Started on ${host}:${port}`)
})

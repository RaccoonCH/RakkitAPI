import { Router } from 'express'
import { scanDirSync, fileExistsSync } from '../utils/file'
const router = Router()

const getFilePath = (file, a): string => {
  return `./${file}/${a}.ts`
}

scanDirSync(__dirname, file => {
  // Run before api import
  const routerFile = getFilePath(file, 'router')
  const middlewareFile = getFilePath(file, 'middleware')
  if (fileExistsSync(__dirname, routerFile)) {
    // Load middlewares if middleware.js file exists
    const middlewares = fileExistsSync(__dirname, middlewareFile) && require(`./${file}/middleware`).default
    const apiRouterConfig = require(routerFile).default
    const apiRouter = Router()

    // Load "before" middlewares
    middlewares.before && middlewares.before.forEach(mw => apiRouter.use(mw))
  
    // Load routes
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
  
    // Import API
    router.use(`/${file}`, apiRouter)
    console.log(`API: ${file} - IMPORTED ✅`)
  } else {
    console.log(`API: ${file} - router.ts is required ❌`)
  }
})

export default router

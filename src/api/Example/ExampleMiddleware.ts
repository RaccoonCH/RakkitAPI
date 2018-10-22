import RakkitMiddleware from '../../types/Types/RakkitRouter/RakkitMiddleware'
import { Request, Response, NextFunction } from 'express'

export default new RakkitMiddleware(
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Route called in Example RP')
    next()
  },
  (req: Request, res: Response) => {

  },
)

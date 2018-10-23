import { Middleware } from '../../class/app'
import { Request, Response, NextFunction } from 'express'

export default new Middleware(
  (req: Request, res: Response, next: NextFunction) => {
    next()
  },
  (req: Request, res: Response) => {

  },
)

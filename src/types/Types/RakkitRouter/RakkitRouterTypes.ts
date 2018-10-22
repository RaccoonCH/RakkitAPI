import { NextFunction, Request, Response } from 'express'

export type RakkitAction = ((req: Request, res: Response, next: NextFunction) => any) | ((req: Request, res: Response) => any)
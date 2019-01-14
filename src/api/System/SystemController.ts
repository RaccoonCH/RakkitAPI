import { Main } from '../..'
import { Request, Response } from 'express'

export default class SystemController {
  static async restart(req: Request, res: Response) {
    console.log(Main.Instance.Load())
  }
}

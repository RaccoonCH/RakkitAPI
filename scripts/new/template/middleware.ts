import { Request, Response, NextFunction } from "express";
import { Middleware } from "@logic";

export default new Middleware(
  (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  (req: Request, res: Response) => {

  }
);

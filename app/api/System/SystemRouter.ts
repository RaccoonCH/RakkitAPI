import { Router, Route } from "@logic";
import SystemController from "./SystemController";

export default new Router([
  new Route("get", "/restart", SystemController.restart)
]);

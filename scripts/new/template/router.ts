import { Router, Route } from "@logic";
import _CONTROLLER_FILE_ from "./_CONTROLLER_FILE_";

export default new Router([
  new Route("get", "/", _CONTROLLER_FILE_.hello)
]);

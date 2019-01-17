import { Router, Route } from "@logic";
import ExampleController from "./ExampleController";

export default new Router([
  new Route("get", "/", ExampleController.getAll),
  new Route("get", "/:id", ExampleController.getOne),
  new Route("post", "/", ExampleController.create),
  new Route("put", "/:id", ExampleController.update),
  new Route("delete", "/:id", ExampleController.remove)
]);

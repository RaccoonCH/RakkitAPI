import Culture from "./model";
import { Query, Resolver } from "type-graphql";

@Resolver(Culture)
export default class CultureResolver {
  constructor (private culture: Culture) {}

  @Query(returns => [Culture])
  getAll() {
    return Culture.find()
  }
}

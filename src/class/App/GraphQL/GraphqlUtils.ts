import { QueryArgs } from '..'
import { ArgsType, Field, ClassType } from 'type-graphql'

export class GraphqlUtils {
  public static createArgsClass<DefaultClass>(defaultClass: ClassType<DefaultClass>) {
    @ArgsType()
    class GraphqlArgs extends QueryArgs {
      @Field(type => defaultClass, { nullable: true })
      where?: DefaultClass
    }

    return GraphqlArgs as any
  }
}

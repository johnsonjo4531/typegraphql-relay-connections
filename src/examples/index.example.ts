import { execute } from "graphql";
import gql from "graphql-tag";
import "reflect-metadata";
import {
  Args,
  ArgsType,
  buildSchema,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import {
  ForwardPaginationArgs,
  ConnectionType,
  EdgeType,
  BackwardPaginationArgs,
} from "../";
import { Cursor as InitCursor, serializeCursor } from "../cursor";
import { edgesToReturn } from "./pagination-algo.example";

@ObjectType()
class Item {
  @Field()
  id!: number;
}

@InputType()
class Cursor implements InitCursor {
  @Field()
  id!: number;

  [key: string]: unknown;
}
@ObjectType()
export class ItemEdge extends EdgeType<Cursor>(Item) {}

@ObjectType()
export class ItemConnection extends ConnectionType<Cursor>(ItemEdge) {}

export const items = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

@Resolver(Item)
export class ItemResolver {
  @Query(() => ItemConnection)
  Items(
    @Args() forwardPaging: ForwardPaginationArgs<Cursor>,
    @Args() backwardPaging: BackwardPaginationArgs<Cursor>
  ): ItemConnection {
    const edges = edgesToReturn(
      items.map((node) => ({ node, cursor: { id: node.id } })),
      { ...forwardPaging, ...backwardPaging }
    );
    return {
      edges,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: items[items.length - 1],
        startCursor: items[0],
      },
    };
  }
}
(async () => {
  const schema = await buildSchema({
    resolvers: [ItemResolver],
  });
  const result = execute({
    schema,
    document: gql`
      #graphql
      query ($after: Cursor!, $before: Cursor!) {
        Items(after: $after, before: $before, first: 3) {
          edges {
            cursor
            node {
              id
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    `,
    variableValues: {
      before: serializeCursor({
        id: 4,
      }),
      after: serializeCursor({
        id: 2,
      }),
    },
  });

  console.log(JSON.stringify(await result, null, 2));
})();

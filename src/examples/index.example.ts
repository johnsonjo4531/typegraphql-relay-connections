import { execute } from "graphql";
import gql from "graphql-tag";
import "reflect-metadata";
import {
  Args,
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
import Cursor, { serializeCursor } from "../cursor";

@ObjectType()
class Item {
  @Field()
  id!: number;
}

@ObjectType()
export class ItemEdge extends EdgeType(Item) {}

@ObjectType()
export class ItemConnection extends ConnectionType({
  edge: ItemEdge,
  node: Item,
}) {}

@InputType()
class MyProjectsCursor implements Cursor {
  @Field()
  _id!: number;

  [key: string]: unknown;
}

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
    @Args() _forwardPaging: ForwardPaginationArgs,
    @Args() _backwardPaging: BackwardPaginationArgs
  ): ItemConnection {
    return {
      edges: items.map((node) => ({
        /** You can pick off whatever properties fit your cursor or repeat the whole node */
        cursor: { id: node.id },
        node,
      })),
      nodes: items,
      pageInfo: {
        count: items.length,
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
      query ($after: Cursor!, $before: Cursor!, first: 3) {
        Items(after: $after, before: $before) {
          edges {
            cursor
            node {
              id
            }
          }
          nodes {
            id
          }
          pageInfo {
            count
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

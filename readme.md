# typegraphql-relay-connections

This library provides a way to setup typings for TypeGraphQL with Relay.

Note that though pagination types and utils are in this repo, the implementation of the paging algorithms are up to the user this is on purpose and is meant to keep this library small and maintanable.

## Usage

See the [tests](./src/__tests__/index.spec.ts) and the [example](./src/examples/index.example.ts) folder for examples.

Here's a (possibly, at some point, out of date) version of the example:

```ts
import "reflect-metadata";
import { execute } from "graphql";
import gql from "graphql-tag";
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
    @Args() forwardPaging: ForwardPaginationArgs,
    @Args() backwardPaging: BackwardPaginationArgs
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
      query ($cursor: Cursor!) {
        Items {
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
      cursor: serializeCursor({
        id: 2,
      }),
    },
  });

  console.log(JSON.stringify(await result, null, 2));
})();
```
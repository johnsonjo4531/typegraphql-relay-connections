---
id: "index"
title: "typegraphql-relay-connections"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

<p align="center">
  <img src="./docs/static/img/logo.png" />
</p>

# typegraphql-relay-connections

This library provides a way to setup typings for [TypeGraphQL](https://typegraphql.com/) with Relay.

Note that though pagination types and utils are in this repo, the implementation of the paging algorithms are up to the user this is on purpose and is meant to keep this library small and maintanable.

## Using mongoose?

There is a companion library available called [mongoose-relay-paginate](https://www.npmjs.com/package/mongoose-relay-paginate)! It works great with this library.

## Documentation

For more details than below view the [Docs](https://johnsonjo4531.github.io/typegraphql-relay-connections/).

## Tutorial

First create an object-type through [type-graphql](https://typegraphql.com/)

```ts
@ObjectType()
class Item {
  @Field()
  id!: number;
}
```

Then add this libraries Edge and Connection types to it:

```ts
@ObjectType()
export class ItemEdge extends EdgeType(Item) {}

@ObjectType()
export class ItemConnection extends ConnectionType(ItemEdge) {}

@InputType()
class MyProjectsCursor implements Cursor {
  @Field()
  _id!: number;

  [key: string]: unknown;
}
```

### Example

See the [tests](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/main/src/__tests__/index.spec.ts) and the [example](https://github.com/johnsonjo4531/typegraphql-relay-connections/tree/main/src/examples) folder for more examples.

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
import Cursor, {
  ForwardPaginationArgs,
  ConnectionType,
  EdgeType,
  BackwardPaginationArgs,
  serializeCursor
} from "typegraphql-relay-connections";

@ObjectType()
class Item {
  @Field()
  id!: number;
}

@ObjectType()
export class ItemEdge extends EdgeType(Item) {}

@ObjectType()
export class ItemConnection extends ConnectionType(ItemEdge) {}

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
      query ($cursor: Cursor!) {
        Items {
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
      cursor: serializeCursor({
        id: 2,
      }),
    },
  });

  console.log(JSON.stringify(await result, null, 2));
})();
```

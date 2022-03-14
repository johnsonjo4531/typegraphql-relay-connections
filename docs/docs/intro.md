---
sidebar_position: 1
---

# Intro 🚀

This library provides a way to setup typings for [TypeGraphQL](https://typegraphql.com/) with Relay Connection Types. Relay Connection Types are a great way to define pagination in an app. This libraries connection types follow the [Relay Connection Type Server Standard](https://relay.dev/docs/guides/graphql-server-specification/). You may want to read up on relay if you're confused on what the benefits of relay connections to find out how exactly this library works. Particularly this library implements the second part of the standard, so it accomplishes: 2.) A description of how to page through connections, so you may want to check out the [relevant section on connections in the relay GraphQL server standard](https://relay.dev/docs/guides/graphql-server-specification/#connections).

Note that though pagination types and utils are in this repo, the implementation of the paging algorithms are up to the user this is on purpose and is meant to keep this library small and maintanable.

## Show Me Da Codez!! 💻

The quickest possible example to show what this library does is the following. We create two GraphQL ObjectTypes using TypeGraphQL object types you can define that uses only what 

```ts
import {
  Field,
  ObjectType,
} from "type-graphql";
import {
  ConnectionType,
  EdgeType
} from "typegraphql-relay-connections";

@ObjectType()
class Song {
  @Field()
  id!: string

  @Field()
  title!: string;
}

@ObjectType()
export class SongEdge extends EdgeType(Song) {}

@ObjectType()
export class SongConnection extends ConnectionType({
  edge: SongEdge,
  node: Song,
}) {}
```

The last thing we can do with this library is [extend the built in Cursor](./tutorials/custom-cursors) like so:

```ts
declare module "typegraphql-relay-connections" {
  interface Cursor {
    id: string;
  }
}
```


## Peer Dependencies 🔗

All our peer dependencies are due to TypeGraphQL. Follow the setup section for [TypeGraphQL](https://typegraphql.com/).

```bash
yarn add graphql@15 reflect-metadata type-graphql
```

## Background on TypeGraphQL 😎

The idea behind TypeGraphQL is you define your GraphQL types using TypeScript. TypeGraphQL follows a code first approach rather than the schema first approach. Since TypeGraphQL's code first approach is written in TypeScript this allows you to strongly type your GraphQL server.

## Introductory Example 🤓

See this intro example [on codesandbox](https://codesandbox.io/s/typegraphql-relay-connections-intro-example-66ec9o)

We'll start with some imports for this (you can replace apollo-server with the graphql server you choose to use.):

```ts
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  Field,
  ObjectType,
  Args,
  Query,
  Resolver,
  buildSchema
} from "type-graphql";
import {
  ForwardPaginationArgs,
  ConnectionType,
  EdgeType,
  BackwardPaginationArgs
} from "typegraphql-relay-connections";
// you'll have to make this yourself for an example see the codesandbox
import * as controller from "./song.controller";
```

First create an object-type through [type-graphql](https://typegraphql.com/)

```ts
@ObjectType()
class Song {
  @Field()
  id!: string

  @Field()
  title!: string;
}
```

That last part was just TypeGraphQL, but next is where this library comes in. It helps you create the Edge and Connection ObjectTypes as well as a custom cursor. Both the `EdgeType` and `ConnectionType` functions come from this library.

```ts
@ObjectType()
export class SongEdge extends EdgeType(Song) {}

@ObjectType()
export class SongConnection extends ConnectionType({
  edge: SongEdge,
  node: Song,
}) {}


declare module "typegraphql-relay-connections" {
  interface Cursor {
    id: string;
  }
}
```

The Rest is just more TypeGraphQL.

```ts
@Resolver(Song)
export class SongResolver {
  @Query(() => SongConnection)
  async songs(
    @Args() forwardPaging: ForwardPaginationArgs<Cursor>,
    @Args() backwardPaging: BackwardPaginationArgs<Cursor>
  ): Promise<SongConnection> {
    // implementation up to you!
    return controller.getSongs({forwardPaging, backwardPaging});
  }
}

const PORT = 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [SongResolver]
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
```



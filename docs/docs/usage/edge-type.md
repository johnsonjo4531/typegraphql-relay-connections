---
sidebar_position: 1
---

# EdgeType 🧀

The `EdgeType` allows you to create a GraphQL relay edge ObjectType from a base type. ObjectTypes are what you can return from any graphql resolver, see the examples for more full implementations of how to connect to resolvers. We'll get to a more full and complete example of `EdgeType`s below, but for now here is an isolated example showing how exactly the `EdgeType` is used.

```ts
@ObjectType()
export class SongEdge extends EdgeType(Song) {
  // You can add additional properties and values that are specific to your specific EdgeType here...
}
```

For a more full example, all you need to do is create a base ObjectType Class to pass into the EdgeType function:

```ts
import {ObjectType, Field} from "type-graphql";
import {EdgeType} from "typegraphql-relay-connections";

// This is our ObjectType:
@ObjectType()
class Song {
  @Field()
  id!: string

  @Field()
  title!: string;
}

// This is the EdgeType:
@ObjectType()
export class SongEdge extends EdgeType(Song) {}
```
---
sidebar_position: 2
---

# ConnectionType 🦔

The `ConnectionType` function is the slightly more complicated of the two main functions. We'll define a full example below, but if we isolate the ConnectionType by itself you'll see it looks like this:


```ts
@ObjectType()
export class SongConnection extends ConnectionType(SongEdge) {
  // You can add additional Types to your ConnectionType that are specific to it here:
}
```

To have a more complete example all you need to do is create a `ObjectType` class, `EdgeType` class, and then plug them in to the `ConnectionType` class:

```ts
import {ObjectType, Field} from "type-graphql";
import {EdgeType, ConnectionType} from "typegraphql-relay-connections";

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

// This is the ConnectionType:
@ObjectType()
export class SongConnection extends ConnectionType(SongEdge) {}
```
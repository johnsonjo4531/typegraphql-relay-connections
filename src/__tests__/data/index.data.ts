import {
  Arg,
  Args,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
  createUnionType,
} from "type-graphql";
import {
  ForwardPaginationArgs,
  ConnectionType,
  CursorScalar,
  EdgeType,
  BackwardPaginationArgs,
} from "../..";
import Cursor, {
  serializeCursor as marshallCursor,
  deserializeCursor as unmarshallCursor,
  serializeCursor,
} from "../../cursor";

@ObjectType()
class Item {
  @Field()
  id!: number;
}

@ObjectType()
class Thing {
  @Field()
  id!: number;

  @Field()
  type!: string;
}

@ObjectType()
export class ItemEdge extends EdgeType(Item) {}

@ObjectType()
export class ItemConnection extends ConnectionType({
  edge: ItemEdge,
  node: Item,
}) {}

const ThingItem = createUnionType({
  name: "ThingItem",
  types: () => [Thing, Item] as const,
  description: "A Thing or an Item",
  resolveType(doc) {
    return "type" in doc ? "Thing" : "Item";
  },
});

@ObjectType()
export class ThingItemEdge extends EdgeType(ThingItem) {}

@ObjectType()
export class ThingItemConnection extends ConnectionType({
  edge: ThingItemEdge,
  node: ThingItem,
}) {}

@InputType()
class CursorInput1 implements Cursor {
  @Field()
  _id!: number;

  [key: string]: unknown;
}

@InputType()
class CursorInput2 {
  @Field(() => CursorScalar)
  cursor!: Cursor;
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

export const things = [
  { id: 5, type: "person" },
  { id: 6, type: "dog" },
  { id: 7, type: "country" },
];

export const thingItems = [...things, ...items];
type G = typeof Item;

@Resolver(Item)
export class ItemResolver {
  @Query(() => ItemConnection)
  Items(): ItemConnection {
    return {
      edges: items.map((node) => ({
        /** You can pick off whatever properties fit your cursor or repeat the whole node */
        cursor: { id: node.id },
        node,
      })),
      nodes: items,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: items[items.length - 1],
        startCursor: items[0],
      },
    };
  }

  @Query(() => ThingItemConnection)
  ThingItems(): ThingItemConnection {
    return {
      edges: thingItems.map((node, i) => ({
        /** You can pick off whatever properties fit your cursor or repeat the whole node */
        cursor: { id: node.id },
        node,
      })),
      nodes: thingItems,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: thingItems[thingItems.length - 1],
        startCursor: thingItems[0],
      },
    };
  }

  @Query(() => CursorScalar)
  cursor1(@Arg("cursor") cursor: CursorInput1) {
    return cursor;
  }

  @Query(() => CursorScalar)
  cursor2(@Arg("cursor") cursor: CursorInput2) {
    return cursor;
  }

  @Query(() => Boolean)
  pagingForward(@Args() _pageInfo: ForwardPaginationArgs) {
    return true;
  }

  @Query(() => Boolean)
  pagingBackward(@Args() _pageInfo: BackwardPaginationArgs) {
    return true;
  }
}

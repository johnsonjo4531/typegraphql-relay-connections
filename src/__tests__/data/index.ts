import {
  Arg,
  Args,
  Field,
  InputType,
  ObjectType,
  Query,
  Resolver,
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
export class ItemEdge extends EdgeType(Item) {}

@ObjectType()
export class ItemConnection extends ConnectionType({
  edge: ItemEdge,
  node: Item,
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
        count: items.length,
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: items[items.length - 1],
        startCursor: items[0],
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

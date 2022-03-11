import { ObjectType, Field, ArgsType, ClassType } from "type-graphql";
import CursorScalar, { serializeCursor, deserializeCursor } from "./cursor";
import type { Cursor } from "./cursor";
import { Min } from "class-validator";

/** Allows forward pagination of a Relay connection type
 * @public
 */
@ArgsType()
export class ForwardPaginationArgs {
  @Field(() => CursorScalar, {
    nullable: true,
    description: "Grabs after the given cursor",
  })
  after?: Cursor;

  @Field(() => Number, {
    nullable: true,
    description: "Grabs the first n records",
  })
  first?: number;
}

/** Allows backward pagination of a relay connection type
 * @public
 */
@ArgsType()
export class BackwardPaginationArgs {
  @Field(() => CursorScalar, {
    nullable: true,
    description: "Grabs before the given cursor",
  })
  before?: Cursor;

  @Field(() => Number, {
    nullable: true,
    description: "Grabs the last n records",
  })
  last?: number;
}

/** PageInfo is information about the paging/cursoring happening on the server.
 * You can use this information to request either the next or previous pages.
 * Use it in conjunction with the `ForwardPaginationArgs` and `BackwardPaginationArgs`.
 * @public
 */
@ObjectType({
  description: `
  PageInfo is information about the paging/cursoring happening on the server. 
  You can use this information to request either the next or previous pages.
  Use it in conjunction with the \`ForwardPaginationArgs\` and \`BackwardPaginationArgs\`.
`,
})
export class PageInfo {
  @Field(() => Boolean, {
    description: "",
  })
  hasNextPage!: boolean;

  @Field(() => Boolean)
  hasPreviousPage!: boolean;

  @Field(() => CursorScalar, { nullable: true })
  startCursor?: Cursor;

  @Field(() => CursorScalar, { nullable: true })
  endCursor?: Cursor;

  @Field()
  @Min(0)
  count!: number;
}

export type NodesType = unknown;
export type NodesTypeClass = ClassType<NodesType>;
export type ClassReturnType<T extends ClassType<unknown>> = T extends ClassType<
  infer J
>
  ? J
  : never;
export class RelayEdgeType<NodeType extends NodesType = NodesType> {
  cursor!: Cursor;
  node!: NodeType;
}

/** Setup a extensible EdgeType
 *
 * @param nodeType
 * @returns A graphql object type that represents fields that can be queried.
 * @example
Usage:

```ts
// create an object type
@ObjectType()
class Item {
  @Field()
  id!: number;
}

// Create your extensible Edge type
@ObjectType()
export class ItemEdge extends EdgeType(Item) {
  // add additional properties here
  @Field(() => Date)
  createdAt: Date
}
```
 */
export function EdgeType<NodeType extends NodesType>(
  nodeType: ClassType<NodeType>
): ClassType<RelayEdgeType<NodeType>> {
  /** A relay edge graphql object types. Use this as a return value in your TypeGraphQL resolvers.
   */
  @ObjectType(`${nodeType.constructor.name}Edge`, { isAbstract: true })
  class Edge extends RelayEdgeType<NodeType> {
    @Field(() => nodeType)
    node!: NodeType;

    @Field(() => CursorScalar, {
      description: "Used in `before` and `after` args",
    })
    cursor!: Cursor;
  }

  return Edge;
}

export class RelayConnectionType<
  EdgeType extends RelayEdgeType,
  NodeType extends NodesType
> {
  pageInfo!: PageInfo;
  edges!: EdgeType[];
  nodes!: NodeType[];
}

/** Setup a extensible ConnectionType
 *
 * @param nodeType
 * @returns A graphql object type that represents fields that can be queried.
 * @example
Usage:

```ts
@ObjectType()
class Item {
  @Field()
  id!: number;
}

@ObjectType()
export class ItemEdge extends EdgeType(Item) {}


// You must create an edge type first
@ObjectType()
export class ItemConnection extends ConnectionType({
  edge: ItemEdge,
  node: Item,
}) {}
```
*/
export function ConnectionType<
  EdgeType extends RelayEdgeType,
  NodeType extends NodesType
>({
  edge,
  node,
}: {
  edge: ClassType<EdgeType>;
  node: ClassType<NodesType>;
}): ClassType<RelayConnectionType<EdgeType, NodeType>> {
  @ObjectType(`${edge.constructor.name.replace("Edge", "")}Connection`, {
    isAbstract: true,
  })
  class Connection implements RelayConnectionType<EdgeType, NodeType> {
    @Field(() => PageInfo)
    pageInfo!: PageInfo;

    @Field(() => [edge])
    edges!: EdgeType[];

    @Field(() => [node])
    nodes!: NodeType[];
  }

  return Connection;
}

export type { Cursor };
export {
  serializeCursor as toExternalCursor,
  deserializeCursor as toInternalCursor,
  CursorScalar,
};

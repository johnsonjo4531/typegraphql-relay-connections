import { ObjectType, Field, ArgsType, ClassType } from "type-graphql";
import CursorScalar, { serializeCursor, deserializeCursor } from "./cursor";
import type { Cursor } from "./cursor";
import { Min } from "class-validator";
type HasConstructor<T> = T & { constructor: { name: string } };

/** Allows forward pagination of a Relay connection type
 * @public
 */
@ArgsType()
export class ForwardPaginationArgs<CursorType extends Cursor = Cursor> {
  /** Grabs records starting from after the given cursor.
   * @public
   */
  @Field(() => CursorScalar, {
    nullable: true,
    description: "Grabs records starting from after the given cursor.",
  })
  after?: CursorType;

  /** Grabs the first n records.
   * @public
   */
  @Field(() => Number, {
    nullable: true,
    description: "Grabs the first n records.",
  })
  first?: number;
}

/** Allows backward pagination of a relay connection type
 * @public
 */
@ArgsType()
export class BackwardPaginationArgs<CursorType extends Cursor = Cursor> {
  /** Grabs records ending before the given cursor.
   * @public
   */
  @Field(() => CursorScalar, {
    nullable: true,
    description: "Grabs records ending before the given cursor.",
  })
  before?: CursorType;

  /** Grabs the last n records.
   * @public
   */
  @Field(() => Number, {
    nullable: true,
    description: "Grabs the last n records.",
  })
  last?: number;
}

@ArgsType()
export class FullPaginationArgs<CursorType extends Cursor = Cursor>
  implements ForwardPaginationArgs<Cursor>, BackwardPaginationArgs<Cursor>
{
  /** Grabs records ending before the given cursor.
   * @public
   */
  @Field(() => CursorScalar, {
    nullable: true,
    description: "Grabs records ending before the given cursor.",
  })
  before?: CursorType;

  /** Grabs the last n records.
   * @public
   */
  @Field(() => Number, {
    nullable: true,
    description: "Grabs the last n records.",
  })
  last?: number;

  /** Grabs records starting from after the given cursor.
   * @public
   */
  @Field(() => CursorScalar, {
    nullable: true,
    description: "Grabs records starting from after the given cursor.",
  })
  after?: CursorType;

  /** Grabs the first n records.
   * @public
   */
  @Field(() => Number, {
    nullable: true,
    description: "Grabs the first n records.",
  })
  first?: number;
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
export class PageInfo<CursorType extends Cursor = Cursor> {
  /** Whether the query has more records after the end cursor.
   * @public
   */
  @Field(() => Boolean, {
    description: "Whether the query has more records after the end cursor.",
  })
  hasNextPage!: boolean;

  /** Whether the query has more records before the start cursor.
   * @public
   */
  @Field(() => Boolean, {
    description: "Whether the query has more records before the start cursor.",
  })
  hasPreviousPage!: boolean;

  /** The cursor representing the first record from the returned query.
   * Can be used to query before or after this record.
   * @public
   */
  @Field(() => CursorScalar, {
    nullable: true,
    description: `
    The cursor representing the first record from the returned query. 
    Can be used to query before or after this record.`,
  })
  startCursor?: CursorType;

  /** The cursor representing the last record from the returned query.
   * Can be used to query before or after this record. */
  @Field(() => CursorScalar, {
    nullable: true,
    description: `
    The cursor representing the last record from the returned query. 
    Can be used to query before or after this record.`,
  })
  endCursor?: CursorType;

  /** The estimated total count of records that may be returned across multiple queries.
   * @public
   */
  @Field({
    description:
      "The estimated total count of records that may be returned across multiple queries.",
  })
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
export class RelayEdgeType<
  CursorType extends Cursor = Cursor,
  NodeType extends NodesType = unknown
> {
  cursor!: CursorType;
  node!: NodeType;
}

/** Setup a extensible EdgeType
 *
 * @param nodeType
 * @returns A graphql object type that represents fields that can be queried.
 * @example
 * Usage:
 *
 * ```ts
 * // create an object type
 * @ObjectType()
 * class Item {
 *   @Field()
 *   id!: number;
 * }
 *
 * // Create your extensible Edge type
 * @ObjectType()
 * export class ItemEdge extends EdgeType(Item) {
 *   // add additional properties here
 *   @Field(() => Date)
 *   createdAt: Date
 * }
 * ```
 *
 * @public
 */
export function EdgeType<
  CursorType extends Cursor = Cursor,
  NodeType extends NodesType = unknown
>(
  nodeType: ClassType<NodeType> | HasConstructor<NodeType>
): ClassType<RelayEdgeType<CursorType, NodeType>> {
  /** An Edge Type is an intermediate result that is generally returned
   * from the server as part of a ConnectionType which allows rerunning of a query at
   * any given point through its use of cursors.
   * @public
   */
  @ObjectType(`${nodeType.constructor.name}Edge`, {
    isAbstract: true,
    description: `
    An Edge Type is an intermediate result that is generally returned
    from the server as part of a ConnectionType which allows rerunning of a query at
    any given point through its use of cursors.`,
  })
  class Edge extends RelayEdgeType<CursorType, NodeType> {
    /** The data of the record that goes along with this edge.
     * @public
     */
    @Field(() => nodeType, {
      description: "The data of the record that goes along with this edge.",
    })
    node!: ClassReturnType<ClassType<NodeType>>;

    /** Represents this location in the query use it in `before` and `after` args
     * to query before and after this location.
     * @public
     */
    @Field(() => CursorScalar, {
      description: `
      Represents this location in the query use it in \`before\` and \`after\` args
      to query before and after this location.`,
    })
    cursor!: CursorType;
  }

  return Edge;
}

export class RelayConnectionType<
  CursorType extends Cursor = Cursor,
  EdgeType extends RelayEdgeType<CursorType> = RelayEdgeType<CursorType>,
  NodeType extends NodesType = unknown
> {
  pageInfo!: PageInfo;
  edges!: EdgeType[];
  nodes!: NodeType[];
}

/** Setup an extensible ConnectionType
 *
 * @returns A graphql object type that represents fields that can be queried.
 * @example
 * Usage:
 *
 * ```ts
 * @ObjectType()
 * class Item {
 *   @Field()
 *   id!: number;
 * }
 *
 * @ObjectType()
 * export class ItemEdge extends EdgeType(Item) {}
 *
 *
 * // You must create an edge type first
 * @ObjectType()
 * export class ItemConnection extends ConnectionType({
 *   edge: ItemEdge,
 *   node: Item,
 * }) {}
 * ```
 *
 * @public
 */
export function ConnectionType<
  CursorType extends Cursor = Cursor,
  EdgeType extends RelayEdgeType<CursorType> = RelayEdgeType<CursorType>,
  NodeType extends NodesType = unknown
>({
  edge,
  node,
}: {
  edge: ClassType<EdgeType> | HasConstructor<EdgeType>;
  node: ClassType<NodeType> | HasConstructor<NodeType>;
}): ClassType<RelayConnectionType<CursorType, EdgeType, NodeType>> {
  /** A Connection Type is returned as a result from the server
   * that allows you to rerun a query at a different location using cursors
   * which are available in both the PageInfo and the EdgeType.
   * @public
   */
  @ObjectType(`${edge.constructor.name.replace("Edge", "")}Connection`, {
    isAbstract: true,
    description: `
    A Connection Type is returned as a result from the server
    that allows you to rerun a query at a different location using cursors 
    which are available in both the PageInfo and the EdgeType.`,
  })
  class Connection
    implements RelayConnectionType<CursorType, EdgeType, NodeType>
  {
    /** PageInfo is information about the paging/cursoring happening on the server.
     * You can use this information to request either the next or previous pages.
     * Use it in conjunction with the `ForwardPaginationArgs` and `BackwardPaginationArgs`.
     * @public
     */
    @Field(() => PageInfo, {
      description: `
      PageInfo is information about the paging/cursoring happening on the server.
      You can use this information to request either the next or previous pages.
      Use it in conjunction with the \`ForwardPaginationArgs\` and \`BackwardPaginationArgs\`.
      `,
    })
    pageInfo!: PageInfo;

    /** A list of objects with a record data object (node) and its corresponding cursor from the query.
     * @public
     */
    @Field(() => [edge], {
      description:
        "A list of objects with a record data (node) and its corresponding cursor from the query.",
    })
    edges!: ClassReturnType<ClassType<EdgeType>>[];

    /** A list of record data objects from the query.
     * @public
     */
    @Field(() => [node])
    nodes!: ClassReturnType<ClassType<NodeType>>[];
  }

  return Connection;
}

export type { Cursor };
export { serializeCursor, deserializeCursor, CursorScalar };

import {
  BackwardPaginationArgs,
  Cursor,
  ForwardPaginationArgs,
  NodesType,
  RelayEdgeType,
} from "..";
import { serializeCursor } from "../cursor";

export function applyCursorsToEdges<
  CursorType extends Cursor = Cursor,
  NodeType extends NodesType = unknown
>(
  allEdges: RelayEdgeType<CursorType, NodeType>[],
  {
    after,
    before,
  }: Pick<
    ForwardPaginationArgs<CursorType> & BackwardPaginationArgs<CursorType>,
    "before" | "after"
  >
) {
  const edges = allEdges;
  if (after) {
    const afterEdge = edges.findIndex(
      (x) => serializeCursor(x.cursor) === serializeCursor(after)
    );
    if (afterEdge !== -1) {
      edges.splice(0, afterEdge + 1);
    }
  }
  if (before) {
    const beforeEdge = edges.findIndex(
      (x) => serializeCursor(x.cursor) === serializeCursor(before)
    );
    if (beforeEdge !== -1) {
      edges.splice(beforeEdge);
    }
  }
  return edges;
}

export function edgesToReturn<
  CursorType extends Cursor = Cursor,
  NodeType extends NodesType = unknown
>(
  allEdges: RelayEdgeType<CursorType, NodeType>[],
  {
    first,
    after,
    before,
    last,
  }: ForwardPaginationArgs<CursorType> & BackwardPaginationArgs<CursorType>
) {
  const edges = applyCursorsToEdges(allEdges, { after, before });
  if (first !== null && typeof first !== "undefined") {
    if (first < 0) {
      throw new Error("ForwardPagingArg property first cannot be less than 0");
    }
    if (edges.length > first) {
      // Yes that first parameter is negative on purpose, so that it splices from the end of the array.
      const numToDelete = Math.abs(edges.length - first);
      edges.splice(-numToDelete, numToDelete);
    }
  }
  if (last !== null && typeof last !== "undefined") {
    if (last < 0) {
      throw new Error("BackwardPagingArg property last cannot be less than 0");
    }
    if (edges.length > last) {
      const numToDelete = Math.abs(edges.length - last);
      edges.splice(0, numToDelete);
    }
  }
  return edges;
}

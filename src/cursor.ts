import { GraphQLScalarType, GraphQLScalarValueParser } from "graphql";
import type {
  GraphQLScalarSerializer,
  GraphQLScalarLiteralParser,
} from "graphql";
import { Kind } from "graphql/language";

export const encodeBase64 = (str: string) =>
  Buffer.from(str).toString("base64");
export const decodeBase64 = (str: string) =>
  Buffer.from(str, "base64").toString("ascii");

/** The serialized Cursor
 *
 * @description
 * The Cursor is what GraphQL Relay compatible servers use
 * to be able to paginate connections.
 *
 * This Cursor type could be extended with whatever types you want.
 *
 * @example
 * Extending the cursor
 * ```ts
 * declare module 'typegraphql-relay-connections' {
 *    export interface Cursor {
 *      id: string;
 *      sortByProperty: string;
 *    }
 *  }
 * ```
 *
 *
 *
 * ```ts
 *
 * ```
 *
 * @public
 */
export interface Cursor {
  [K: string]: unknown;
}
/** The serialized cursor is the value the cursor will be so it may arrive at the graphql client and be sent through a network.
 * In this case the type is an opaque base64 string.
 *
 * @param internalCursor The full unencoded and parsed cursor.
 * @returns The encoded cursor ready to be sent to the client.
 * @public
 */
export function serializeCursor(internalCursor: Cursor): string {
  return encodeBase64(JSON.stringify(internalCursor));
}

/** The external cursor is the value the cursor will be after it comes from the graphql client.
 *
 * @param externalCursor The serialized cursor that most that was just received from the client.
 * @returns The full deserialized, decoded, and parsed cursor.
 * @public
 */
export function deserializeCursor(externalCursor: string): Cursor {
  return JSON.parse(decodeBase64(externalCursor));
}

function isSerializableToCursor(maybeCursor: unknown): maybeCursor is Cursor {
  if (!(typeof maybeCursor === "object" || Boolean(maybeCursor))) {
    // throw new Error("Invalid Cursor Input")
    return false;
  }
  return true;
}

/** Serializes the cursor or throws an error
 * @param value
 * @returns
 */
const cursorSerialize: GraphQLScalarSerializer<string> = (value) => {
  if (isSerializableToCursor(value)) {
    return serializeCursor(value);
  } else if (typeof value === "string") {
    return value;
  }
  throw new Error("Invalid Cursor Input");
};

/** Deserializes the Cursor or throws an error
 *
 * @param ast
 * @returns
 */
const cursorParseLiteral: GraphQLScalarLiteralParser<Cursor> | undefined = (
  ast
) => {
  if (ast.kind === Kind.STRING) {
    return deserializeCursor(ast.value);
  }
  throw new Error("Invalid Cursor Input");
};

/** Parses to a Cursor from an ast node. */
const cursorParseValue: GraphQLScalarValueParser<Cursor> = (literal) => {
  if (typeof literal === "string") {
    return deserializeCursor(literal);
  }
  throw new Error("Invalid Cursor Input");
};

export const Cursor = new GraphQLScalarType({
  name: "Cursor",
  serialize: cursorSerialize,
  parseLiteral: cursorParseLiteral,
  parseValue: cursorParseValue,
});

export default Cursor;

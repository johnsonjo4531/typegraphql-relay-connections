---
id: "modules"
title: "typegraphql-relay-connections"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [BackwardPaginationArgs](classes/BackwardPaginationArgs.md)
- [ForwardPaginationArgs](classes/ForwardPaginationArgs.md)
- [FullPaginationArgs](classes/FullPaginationArgs.md)
- [PageInfo](classes/PageInfo.md)
- [RelayConnectionType](classes/RelayConnectionType.md)
- [RelayEdgeType](classes/RelayEdgeType.md)

## Interfaces

- [Cursor](interfaces/Cursor.md)

## References

### CursorScalar

Renames and re-exports [Cursor](modules.md#cursor)

## Type Aliases

### ClassReturnType

Ƭ **ClassReturnType**\<`T`\>: `T` extends `ClassType`\<infer J\> ? `J` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ClassType`\<`unknown`\> |

#### Defined in

[index.ts:149](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L149)

___

### NodesType

Ƭ **NodesType**: `unknown`

#### Defined in

[index.ts:147](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L147)

___

### NodesTypeClass

Ƭ **NodesTypeClass**: `ClassType`\<[`NodesType`](modules.md#nodestype)\>

#### Defined in

[index.ts:148](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L148)

## Variables

### Cursor

• **Cursor**: `GraphQLScalarType`

#### Defined in

[cursor.ts:40](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/cursor.ts#L40)

[cursor.ts:107](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/cursor.ts#L107)

## Functions

### ConnectionType

▸ **ConnectionType**\<`CursorType`, `EdgeType`, `NodeType`\>(`«destructured»`): `ClassType`\<[`RelayConnectionType`](classes/RelayConnectionType.md)\<`CursorType`, `EdgeType`, `NodeType`\>\>

Setup an extensible ConnectionType

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](interfaces/Cursor.md) = [`Cursor`](interfaces/Cursor.md) |
| `EdgeType` | extends [`RelayEdgeType`](classes/RelayEdgeType.md)\<`CursorType`, `unknown`, `EdgeType`\> = [`RelayEdgeType`](classes/RelayEdgeType.md)\<`CursorType`, `unknown`\> |
| `NodeType` | extends `unknown` = `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `edge` | `ClassType`\<`EdgeType`\> \| `HasConstructor`\<`EdgeType`\> |
| › `node` | `ClassType`\<`NodeType`\> \| `HasConstructor`\<`NodeType`\> |

#### Returns

`ClassType`\<[`RelayConnectionType`](classes/RelayConnectionType.md)\<`CursorType`, `EdgeType`, `NodeType`\>\>

A graphql object type that represents fields that can be queried.

**`Example`**

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

#### Defined in

[index.ts:267](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L267)

___

### EdgeType

▸ **EdgeType**\<`CursorType`, `NodeType`\>(`nodeType`): `ClassType`\<[`RelayEdgeType`](classes/RelayEdgeType.md)\<`CursorType`, `NodeType`\>\>

Setup a extensible EdgeType

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](interfaces/Cursor.md) = [`Cursor`](interfaces/Cursor.md) |
| `NodeType` | extends `unknown` = `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeType` | `ClassType`\<`NodeType`\> \| `HasConstructor`\<`NodeType`\> |

#### Returns

`ClassType`\<[`RelayEdgeType`](classes/RelayEdgeType.md)\<`CursorType`, `NodeType`\>\>

A graphql object type that represents fields that can be queried.

**`Example`**

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

#### Defined in

[index.ts:188](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L188)

___

### deserializeCursor

▸ **deserializeCursor**(`externalCursor`): [`Cursor`](interfaces/Cursor.md)

The external cursor is the value the cursor will be after it comes from the graphql client.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `externalCursor` | `string` | The serialized cursor that most that was just received from the client. |

#### Returns

[`Cursor`](interfaces/Cursor.md)

The full deserialized, decoded, and parsed cursor.

#### Defined in

[cursor.ts:60](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/cursor.ts#L60)

___

### serializeCursor

▸ **serializeCursor**(`internalCursor`): `string`

The serialized cursor is the value the cursor will be so it may arrive at the graphql client and be sent through a network.
In this case the type is an opaque base64 string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `internalCursor` | [`Cursor`](interfaces/Cursor.md) | The full unencoded and parsed cursor. |

#### Returns

`string`

The encoded cursor ready to be sent to the client.

#### Defined in

[cursor.ts:50](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/cursor.ts#L50)

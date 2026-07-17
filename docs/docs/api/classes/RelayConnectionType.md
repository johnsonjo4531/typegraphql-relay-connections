---
id: "RelayConnectionType"
title: "Class: RelayConnectionType<CursorType, EdgeType>"
sidebar_label: "RelayConnectionType"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |
| `EdgeType` | extends [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`\> = [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`\> |

## Constructors

### constructor

• **new RelayConnectionType**\<`CursorType`, `EdgeType`\>(): [`RelayConnectionType`](RelayConnectionType.md)\<`CursorType`, `EdgeType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |
| `EdgeType` | extends [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`, `unknown`, `EdgeType`\> = [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`, `unknown`\> |

#### Returns

[`RelayConnectionType`](RelayConnectionType.md)\<`CursorType`, `EdgeType`\>

## Properties

### edges

• **edges**: `EdgeType`[]

#### Defined in

[index.ts:259](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/f61ccaf/src/index.ts#L259)

___

### pageInfo

• **pageInfo**: [`PageInfo`](PageInfo.md)\<[`Cursor`](../interfaces/Cursor.md)\>

#### Defined in

[index.ts:258](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/f61ccaf/src/index.ts#L258)

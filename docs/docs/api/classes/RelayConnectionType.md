---
id: "RelayConnectionType"
title: "Class: RelayConnectionType<CursorType, EdgeType, NodeType>"
sidebar_label: "RelayConnectionType"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |
| `EdgeType` | extends [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`\> = [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`\> |
| `NodeType` | extends [`NodesType`](../modules.md#nodestype) = `unknown` |

## Constructors

### constructor

• **new RelayConnectionType**\<`CursorType`, `EdgeType`, `NodeType`\>(): [`RelayConnectionType`](RelayConnectionType.md)\<`CursorType`, `EdgeType`, `NodeType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |
| `EdgeType` | extends [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`, `unknown`, `EdgeType`\> = [`RelayEdgeType`](RelayEdgeType.md)\<`CursorType`, `unknown`\> |
| `NodeType` | extends `unknown` = `unknown` |

#### Returns

[`RelayConnectionType`](RelayConnectionType.md)\<`CursorType`, `EdgeType`, `NodeType`\>

## Properties

### edges

• **edges**: `EdgeType`[]

#### Defined in

[index.ts:236](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/f7686e2/src/index.ts#L236)

___

### nodes

• **nodes**: `NodeType`[]

#### Defined in

[index.ts:237](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/f7686e2/src/index.ts#L237)

___

### pageInfo

• **pageInfo**: [`PageInfo`](PageInfo.md)\<[`Cursor`](../interfaces/Cursor.md)\>

#### Defined in

[index.ts:235](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/f7686e2/src/index.ts#L235)

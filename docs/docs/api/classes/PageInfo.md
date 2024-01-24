---
id: "PageInfo"
title: "Class: PageInfo<CursorType>"
sidebar_label: "PageInfo"
sidebar_position: 0
custom_edit_url: null
---

PageInfo is information about the paging/cursoring happening on the server.
You can use this information to request either the next or previous pages.
Use it in conjunction with the `ForwardPaginationArgs` and `BackwardPaginationArgs`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

## Constructors

### constructor

• **new PageInfo**\<`CursorType`\>(): [`PageInfo`](PageInfo.md)\<`CursorType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

#### Returns

[`PageInfo`](PageInfo.md)\<`CursorType`\>

## Properties

### endCursor

• `Optional` **endCursor**: `CursorType`

The cursor representing the last record from the returned query.
Can be used to query before or after this record.

#### Defined in

[index.ts:145](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L145)

___

### hasNextPage

• **hasNextPage**: `boolean`

Whether the query has more records after the end cursor.

#### Defined in

[index.ts:115](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L115)

___

### hasPreviousPage

• **hasPreviousPage**: `boolean`

Whether the query has more records before the start cursor.

#### Defined in

[index.ts:123](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L123)

___

### startCursor

• `Optional` **startCursor**: `CursorType`

The cursor representing the first record from the returned query.
Can be used to query before or after this record.

#### Defined in

[index.ts:135](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L135)

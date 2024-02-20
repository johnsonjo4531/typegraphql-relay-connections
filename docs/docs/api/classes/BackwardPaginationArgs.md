---
id: "BackwardPaginationArgs"
title: "Class: BackwardPaginationArgs<CursorType>"
sidebar_label: "BackwardPaginationArgs"
sidebar_position: 0
custom_edit_url: null
---

Allows backward pagination of a relay connection type

## Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

## Implemented by

- [`FullPaginationArgs`](FullPaginationArgs.md)

## Constructors

### constructor

• **new BackwardPaginationArgs**\<`CursorType`\>(): [`BackwardPaginationArgs`](BackwardPaginationArgs.md)\<`CursorType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

#### Returns

[`BackwardPaginationArgs`](BackwardPaginationArgs.md)\<`CursorType`\>

## Properties

### before

• `Optional` **before**: `CursorType`

Grabs records ending before the given cursor.

#### Defined in

[index.ts:42](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/6b2073a/src/index.ts#L42)

___

### last

• `Optional` **last**: `number`

Grabs the last n records.

#### Defined in

[index.ts:51](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/6b2073a/src/index.ts#L51)

---
id: "ForwardPaginationArgs"
title: "Class: ForwardPaginationArgs<CursorType>"
sidebar_label: "ForwardPaginationArgs"
sidebar_position: 0
custom_edit_url: null
---

Allows forward pagination of a Relay connection type

## Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

## Implemented by

- [`FullPaginationArgs`](FullPaginationArgs.md)

## Constructors

### constructor

• **new ForwardPaginationArgs**\<`CursorType`\>(): [`ForwardPaginationArgs`](ForwardPaginationArgs.md)\<`CursorType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

#### Returns

[`ForwardPaginationArgs`](ForwardPaginationArgs.md)\<`CursorType`\>

## Properties

### after

• `Optional` **after**: `CursorType`

Grabs records starting from after the given cursor.

#### Defined in

[index.ts:18](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L18)

___

### first

• `Optional` **first**: `number`

Grabs the first n records.

#### Defined in

[index.ts:27](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L27)

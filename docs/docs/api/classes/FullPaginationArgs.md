---
id: "FullPaginationArgs"
title: "Class: FullPaginationArgs<CursorType>"
sidebar_label: "FullPaginationArgs"
sidebar_position: 0
custom_edit_url: null
---

Allows forward pagination of a Relay connection type

## Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

## Implements

- [`ForwardPaginationArgs`](ForwardPaginationArgs.md)\<[`Cursor`](../interfaces/Cursor.md)\>
- [`BackwardPaginationArgs`](BackwardPaginationArgs.md)\<[`Cursor`](../interfaces/Cursor.md)\>

## Constructors

### constructor

• **new FullPaginationArgs**\<`CursorType`\>(): [`FullPaginationArgs`](FullPaginationArgs.md)\<`CursorType`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `CursorType` | extends [`Cursor`](../interfaces/Cursor.md) = [`Cursor`](../interfaces/Cursor.md) |

#### Returns

[`FullPaginationArgs`](FullPaginationArgs.md)\<`CursorType`\>

## Properties

### after

• `Optional` **after**: `CursorType`

Grabs records starting from after the given cursor.

#### Implementation of

[ForwardPaginationArgs](ForwardPaginationArgs.md).[after](ForwardPaginationArgs.md#after)

#### Defined in

[index.ts:84](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L84)

___

### before

• `Optional` **before**: `CursorType`

Grabs records ending before the given cursor.

#### Implementation of

[BackwardPaginationArgs](BackwardPaginationArgs.md).[before](BackwardPaginationArgs.md#before)

#### Defined in

[index.ts:66](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L66)

___

### first

• `Optional` **first**: `number`

Grabs the first n records.

#### Implementation of

[ForwardPaginationArgs](ForwardPaginationArgs.md).[first](ForwardPaginationArgs.md#first)

#### Defined in

[index.ts:93](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L93)

___

### last

• `Optional` **last**: `number`

Grabs the last n records.

#### Implementation of

[BackwardPaginationArgs](BackwardPaginationArgs.md).[last](BackwardPaginationArgs.md#last)

#### Defined in

[index.ts:75](https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/62106af/src/index.ts#L75)

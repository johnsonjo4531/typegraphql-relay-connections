# Changelog

## Version 4

### 4.0.2

This should fix a major bug introduced in 4.0.1 that caused type issues

### 4.0.1

A major bug fix was completed where this error was popping up intermittently:

> Details: No data returned for operation Query, got error(s): Unknown argument "input" on field "FieldName.node". Unknown argument "first" on field "FieldName.node". See the error source property for more information.

For more information [see issue #5 on github](https://github.com/johnsonjo4531/typegraphql-relay-connections/issues/5)

### 4.0.0

Changed first & last arguments to Int (instead of Float) as per relay spec.

## Version 2.x to 3.x

Removed the `nodes` property from the ConnectionType as it is not part of the spec.

Also now the ConnectionType is called by only passing in the ItemEdge in this way:

```ts
@ObjectType()
export class ItemConnection extends ConnectionType(ItemEdge) {}
```

instead of like this (passing in both the node and item edge as an object):

```ts
@ObjectType()
export class ItemConnection extends ConnectionType({
  node: Item,
  edge: ItemEdge,
}) {}
```

## Version 1.x to 2.x

Removed the `count` property from `PageInfo` as it is not part of the spec.

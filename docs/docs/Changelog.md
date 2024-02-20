# Changelog

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
  edge: ItemEdge
}) {}
```


## Version 1.x to 2.x

Removed the `count`  property from `PageInfo` as it is not part of the spec.
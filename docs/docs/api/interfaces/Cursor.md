---
id: "Cursor"
title: "Interface: Cursor"
sidebar_label: "Cursor"
sidebar_position: 0
custom_edit_url: null
---

The serialized Cursor

**`Description`**

The Cursor is what GraphQL Relay compatible servers use
to be able to paginate connections.

This Cursor type could be extended with whatever types you want.

**`Example`**

Extending the cursor
```ts
declare module 'typegraphql-relay-connections' {
   export interface Cursor {
     id: string;
     sortByProperty: string;
   }
 }
```

```ts

```

## Indexable

▪ [K: `string`]: `unknown`

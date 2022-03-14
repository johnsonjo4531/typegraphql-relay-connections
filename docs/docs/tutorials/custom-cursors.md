---
sidebar_position: 1
---

# Extending the Builtin Cursor 📄

The default Cursor type allows any object value, but you may instead want to extend it with more properties and values which will allow autocomplete of those propety value pairs. You could do that like so:

```ts
declare module "typegraphql-relay-connections" {
  interface Cursor {
    // Your additional property value pairs.
    id: string;
  }
}
```
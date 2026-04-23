import { serializeCursor, deserializeCursor } from "../cursor";

test("Cursor should be able to go back and forth", () => {
  const cursor = { foo: 3 };
  expect(deserializeCursor(serializeCursor(cursor))).toMatchObject(cursor);
  expect(deserializeCursor(serializeCursor(cursor)).foo).toBe(3);
});

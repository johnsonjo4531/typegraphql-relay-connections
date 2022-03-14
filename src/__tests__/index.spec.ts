import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ItemResolver } from "./data/index.data";
import { gql } from "graphql-tag";
import { execute } from "graphql";
import { serializeCursor } from "../cursor";

test("can paginate", async () => {
  const schema = await buildSchema({
    resolvers: [ItemResolver],
  });
  const answer = execute({
    schema,
    document: gql`
      #graphql
      query ($cursor: Cursor!) {
        pagingForward(after: $cursor, first: 3)
        pagingBackward(before: $cursor, last: 5)
      }
    `,
    variableValues: {
      cursor: serializeCursor({
        id: 2,
      }),
    },
  });
  expect(await answer).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "pagingBackward": true,
        "pagingForward": true,
      },
    }
  `);
});

test("can getItems", async () => {
  const schema = await buildSchema({
    resolvers: [ItemResolver],
  });
  const items = execute({
    schema,
    document: gql`
      #graphql
      query {
        Items {
          edges {
            cursor
            node {
              id
            }
          }
          nodes {
            id
          }
          pageInfo {
            count
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    `,
    variableValues: {
      cursor: serializeCursor({
        id: 2,
      }),
    },
  });
  expect(await items).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "Items": Object {
          "edges": Array [
            Object {
              "cursor": "eyJpZCI6MX0=",
              "node": Object {
                "id": 1,
              },
            },
            Object {
              "cursor": "eyJpZCI6Mn0=",
              "node": Object {
                "id": 2,
              },
            },
            Object {
              "cursor": "eyJpZCI6M30=",
              "node": Object {
                "id": 3,
              },
            },
            Object {
              "cursor": "eyJpZCI6NH0=",
              "node": Object {
                "id": 4,
              },
            },
          ],
          "nodes": Array [
            Object {
              "id": 1,
            },
            Object {
              "id": 2,
            },
            Object {
              "id": 3,
            },
            Object {
              "id": 4,
            },
          ],
          "pageInfo": Object {
            "count": 4,
            "endCursor": "eyJpZCI6NH0=",
            "hasNextPage": false,
            "hasPreviousPage": false,
            "startCursor": "eyJpZCI6MX0=",
          },
        },
      },
    }
  `);
});

test("Must give cursor use schema", async () => {
  const schema = await buildSchema({
    resolvers: [ItemResolver],
  });
  // Note that though pagination types and utils are in this repo the implementation of the paging algorithms are up to the user.
  const answer = execute({
    schema,
    document: gql`
      #graphql
      query ($cursor: Cursor!) {
        pagingBackward(before: $cursor, last: 5)
      }
    `,
    variableValues: {
      cursor: serializeCursor({
        id: 3,
      }),
    },
  });

  const answer2 = execute({
    schema,
    document: gql`
      #graphql
      query ($cursor: Cursor!) {
        pagingForward(after: $cursor, first: 5)
      }
    `,
    variableValues: {
      cursor: serializeCursor({
        id: "foo",
      }),
    },
  });
  expect(await answer).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "pagingBackward": true,
      },
    }
  `);
  expect(await answer2).toMatchInlineSnapshot(`
    Object {
      "data": Object {
        "pagingForward": true,
      },
    }
  `);
});

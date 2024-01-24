# TypeGraphQL Example 🏋️‍♂️

See the [tests](https://github.com/johnsonjo4531/typegraphql-relay-connections/tree/main/src/__tests__/index.spec.ts) and the [example](https://github.com/johnsonjo4531/typegraphql-relay-connections/tree/main/src/examples/index.example.ts) folder for more examples.

Here's a full-fledged typegraphql server example ([codesandbox link](https://codesandbox.io/s/typegraphql-relay-connections-6wl8ck?file=/src/index.ts)):

```ts
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  buildSchema,
  Args
} from "type-graphql";
import {
  EdgeType,
  ConnectionType,
  BackwardPaginationArgs,
  ForwardPaginationArgs
} from "typegraphql-relay-connections";
import { edgesToReturn } from "./pagination.example";

// Setup GraphQL Schema
@ObjectType()
class Book {
  @Field()
  title!: string;
  @Field()
  author!: string;
}

@InputType()
class NewBookInput {
  @Field()
  title!: string;
  @Field()
  author!: string;
}

// setup relay connection types
@ObjectType()
class BookEdge extends EdgeType(Book) {}

@ObjectType()
class BookConnection extends ConnectionType({
  edge: BookEdge,
  node: Book
}) {}

declare module "typegraphql-relay-connections" {
  interface Cursor {
    id: string;
  }
}

// usually you have some form of database this will do okay for an example
const books: Book[] = [
  {
    title: "Three Little Pigs",
    author: "Joseph Jacobs"
  },
  {
    title: "A Christmas Carol",
    author: "Charles Dickens"
  }
];

// Setup resolver
@Resolver(Book)
class BookResolver {
  @Query((returns) => BookConnection)
  async searchBooksByTitle(
    @Args() backwardPaging: BackwardPaginationArgs,
    @Args() forwardPaging: ForwardPaginationArgs,
    @Arg("title") title: string
  ): Promise<BookConnection> {
    const edges = edgesToReturn(
      books
        .filter((book) => book.title.includes(title))
        .map((node) => ({
          node,
          cursor: {
            id: node.title
          }
        })),
      {}
    );
    return {
      edges,
      nodes: edges.map((x) => x.node),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: edges[edges.length - 1].cursor,
        startCursor: edges[0].cursor,
      }
    };
  }

  @Query((returns) => BookConnection)
  async searchBooksByAuthor(
    @Arg("author") title: string
  ): Promise<BookConnection> {
    const edges = edgesToReturn(
      books
        .filter((book) => book.author.includes(title))
        .map((node) => ({
          node,
          cursor: {
            id: node.title
          }
        })),
      {}
    );
    return {
      edges,
      nodes: edges.map((x) => x.node),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: edges[edges.length - 1].cursor,
        startCursor: edges[0].cursor,
      }
    };
  }

  @Query((returns) => BookConnection)
  async allBooks(): Promise<BookConnection> {
    const edges = edgesToReturn(
      books.map((node) => ({
        node,
        cursor: {
          id: node.title
        }
      })),
      {}
    );
    return {
      edges,
      nodes: edges.map((x) => x.node),
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        endCursor: edges[edges.length - 1].cursor,
        startCursor: edges[0].cursor,
      }
    };
  }

  @Mutation((returns) => Book)
  async addBook(@Arg("newBookData") newBookData: NewBookInput) {
    books.push(newBookData);
    return newBookData;
  }
}

const PORT = 4000;

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [BookResolver]
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
```

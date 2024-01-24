"use strict";(self.webpackChunktypegraphql_relay_connections_docs=self.webpackChunktypegraphql_relay_connections_docs||[]).push([[9180],{8600:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var t=o(5893),r=o(1151);const s={},a="TypeGraphQL Example \ud83c\udfcb\ufe0f\u200d\u2642\ufe0f",l={id:"examples/typegraphql",title:"TypeGraphQL Example \ud83c\udfcb\ufe0f\u200d\u2642\ufe0f",description:"See the tests and the example folder for more examples.",source:"@site/docs/examples/typegraphql.md",sourceDirName:"examples",slug:"/examples/typegraphql",permalink:"/typegraphql-relay-connections/docs/examples/typegraphql",draft:!1,unlisted:!1,editUrl:"https://github.com/johnsonjo4531/typegraphql-relay-connections/docs/blog/docs/examples/typegraphql.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Extending the Builtin Cursor \ud83d\udcc4",permalink:"/typegraphql-relay-connections/docs/tutorials/custom-cursors"},next:{title:"Changelog",permalink:"/typegraphql-relay-connections/docs/Changelog"}},i={},c=[];function p(e){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"typegraphql-example-\ufe0f\ufe0f",children:"TypeGraphQL Example \ud83c\udfcb\ufe0f\u200d\u2642\ufe0f"}),"\n",(0,t.jsxs)(n.p,{children:["See the ",(0,t.jsx)(n.a,{href:"https://github.com/johnsonjo4531/typegraphql-relay-connections/tree/main/src/__tests__/index.spec.ts",children:"tests"})," and the ",(0,t.jsx)(n.a,{href:"https://github.com/johnsonjo4531/typegraphql-relay-connections/tree/main/src/examples/index.example.ts",children:"example"})," folder for more examples."]}),"\n",(0,t.jsxs)(n.p,{children:["Here's a full-fledged typegraphql server example (",(0,t.jsx)(n.a,{href:"https://codesandbox.io/s/typegraphql-relay-connections-6wl8ck?file=/src/index.ts",children:"codesandbox link"}),"):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'import "reflect-metadata";\nimport { ApolloServer } from "apollo-server";\nimport {\n  ObjectType,\n  Field,\n  Resolver,\n  Query,\n  Mutation,\n  Arg,\n  InputType,\n  buildSchema,\n  Args\n} from "type-graphql";\nimport {\n  EdgeType,\n  ConnectionType,\n  BackwardPaginationArgs,\n  ForwardPaginationArgs\n} from "typegraphql-relay-connections";\nimport { edgesToReturn } from "./pagination.example";\n\n// Setup GraphQL Schema\n@ObjectType()\nclass Book {\n  @Field()\n  title!: string;\n  @Field()\n  author!: string;\n}\n\n@InputType()\nclass NewBookInput {\n  @Field()\n  title!: string;\n  @Field()\n  author!: string;\n}\n\n// setup relay connection types\n@ObjectType()\nclass BookEdge extends EdgeType(Book) {}\n\n@ObjectType()\nclass BookConnection extends ConnectionType({\n  edge: BookEdge,\n  node: Book\n}) {}\n\ndeclare module "typegraphql-relay-connections" {\n  interface Cursor {\n    id: string;\n  }\n}\n\n// usually you have some form of database this will do okay for an example\nconst books: Book[] = [\n  {\n    title: "Three Little Pigs",\n    author: "Joseph Jacobs"\n  },\n  {\n    title: "A Christmas Carol",\n    author: "Charles Dickens"\n  }\n];\n\n// Setup resolver\n@Resolver(Book)\nclass BookResolver {\n  @Query((returns) => BookConnection)\n  async searchBooksByTitle(\n    @Args() backwardPaging: BackwardPaginationArgs,\n    @Args() forwardPaging: ForwardPaginationArgs,\n    @Arg("title") title: string\n  ): Promise<BookConnection> {\n    const edges = edgesToReturn(\n      books\n        .filter((book) => book.title.includes(title))\n        .map((node) => ({\n          node,\n          cursor: {\n            id: node.title\n          }\n        })),\n      {}\n    );\n    return {\n      edges,\n      nodes: edges.map((x) => x.node),\n      pageInfo: {\n        hasNextPage: false,\n        hasPreviousPage: false,\n        endCursor: edges[edges.length - 1].cursor,\n        startCursor: edges[0].cursor,\n      }\n    };\n  }\n\n  @Query((returns) => BookConnection)\n  async searchBooksByAuthor(\n    @Arg("author") title: string\n  ): Promise<BookConnection> {\n    const edges = edgesToReturn(\n      books\n        .filter((book) => book.author.includes(title))\n        .map((node) => ({\n          node,\n          cursor: {\n            id: node.title\n          }\n        })),\n      {}\n    );\n    return {\n      edges,\n      nodes: edges.map((x) => x.node),\n      pageInfo: {\n        hasNextPage: false,\n        hasPreviousPage: false,\n        endCursor: edges[edges.length - 1].cursor,\n        startCursor: edges[0].cursor,\n      }\n    };\n  }\n\n  @Query((returns) => BookConnection)\n  async allBooks(): Promise<BookConnection> {\n    const edges = edgesToReturn(\n      books.map((node) => ({\n        node,\n        cursor: {\n          id: node.title\n        }\n      })),\n      {}\n    );\n    return {\n      edges,\n      nodes: edges.map((x) => x.node),\n      pageInfo: {\n        hasNextPage: false,\n        hasPreviousPage: false,\n        endCursor: edges[edges.length - 1].cursor,\n        startCursor: edges[0].cursor,\n      }\n    };\n  }\n\n  @Mutation((returns) => Book)\n  async addBook(@Arg("newBookData") newBookData: NewBookInput) {\n    books.push(newBookData);\n    return newBookData;\n  }\n}\n\nconst PORT = 4000;\n\nasync function bootstrap() {\n  const schema = await buildSchema({\n    resolvers: [BookResolver]\n  });\n\n  // Create the GraphQL server\n  const server = new ApolloServer({\n    schema\n  });\n\n  // Start the server\n  const { url } = await server.listen(PORT);\n  console.log(`Server is running, GraphQL Playground available at ${url}`);\n}\n\nbootstrap();\n'})})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>l,a:()=>a});var t=o(7294);const r={},s=t.createContext(r);function a(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);
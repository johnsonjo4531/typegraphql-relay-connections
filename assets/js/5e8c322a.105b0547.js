"use strict";(self.webpackChunktypegraphql_relay_connections_docs=self.webpackChunktypegraphql_relay_connections_docs||[]).push([[7597],{3006:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=t(5893),s=t(1151);const o={id:"index",title:"typegraphql-relay-connections",sidebar_label:"Readme",sidebar_position:0,custom_edit_url:null},a="typegraphql-relay-connections",i={id:"api/index",title:"typegraphql-relay-connections",description:"This library provides a way to setup typings for TypeGraphQL with Relay.",source:"@site/docs/api/index.md",sourceDirName:"api",slug:"/api/",permalink:"/typegraphql-relay-connections/docs/api/",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"index",title:"typegraphql-relay-connections",sidebar_label:"Readme",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",next:{title:"Exports",permalink:"/typegraphql-relay-connections/docs/api/modules"}},l={},c=[{value:"Using mongoose?",id:"using-mongoose",level:2},{value:"Documentation",id:"documentation",level:2},{value:"Tutorial",id:"tutorial",level:2},{value:"Example",id:"example",level:3}];function p(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{align:"center",children:(0,r.jsx)("img",{src:"./docs/static/img/logo.png"})}),"\n",(0,r.jsx)(n.h1,{id:"typegraphql-relay-connections",children:"typegraphql-relay-connections"}),"\n",(0,r.jsxs)(n.p,{children:["This library provides a way to setup typings for ",(0,r.jsx)(n.a,{href:"https://typegraphql.com/",children:"TypeGraphQL"})," with Relay."]}),"\n",(0,r.jsx)(n.p,{children:"Note that though pagination types and utils are in this repo, the implementation of the paging algorithms are up to the user this is on purpose and is meant to keep this library small and maintanable."}),"\n",(0,r.jsx)(n.h2,{id:"using-mongoose",children:"Using mongoose?"}),"\n",(0,r.jsxs)(n.p,{children:["There is a companion library available called ",(0,r.jsx)(n.a,{href:"https://www.npmjs.com/package/mongoose-relay-paginate",children:"mongoose-relay-paginate"}),"! It works great with this library."]}),"\n",(0,r.jsx)(n.h2,{id:"documentation",children:"Documentation"}),"\n",(0,r.jsxs)(n.p,{children:["For more details than below view the ",(0,r.jsx)(n.a,{href:"https://johnsonjo4531.github.io/typegraphql-relay-connections/",children:"Docs"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"tutorial",children:"Tutorial"}),"\n",(0,r.jsxs)(n.p,{children:["First create an object-type through ",(0,r.jsx)(n.a,{href:"https://typegraphql.com/",children:"type-graphql"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"@ObjectType()\nclass Item {\n  @Field()\n  id!: number;\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Then add this libraries Edge and Connection types to it:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"@ObjectType()\nexport class ItemEdge extends EdgeType(Item) {}\n\n@ObjectType()\nexport class ItemConnection extends ConnectionType({\n  edge: ItemEdge,\n  node: Item,\n}) {}\n\n@InputType()\nclass MyProjectsCursor implements Cursor {\n  @Field()\n  _id!: number;\n\n  [key: string]: unknown;\n}\n"})}),"\n",(0,r.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,r.jsxs)(n.p,{children:["See the ",(0,r.jsx)(n.a,{href:"https://github.com/johnsonjo4531/typegraphql-relay-connections/blob/main/src/__tests__/index.spec.ts",children:"tests"})," and the ",(0,r.jsx)(n.a,{href:"https://github.com/johnsonjo4531/typegraphql-relay-connections/tree/main/src/examples",children:"example"})," folder for more examples."]}),"\n",(0,r.jsx)(n.p,{children:"Here's a (possibly, at some point, out of date) version of the example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'import "reflect-metadata";\nimport { execute } from "graphql";\nimport gql from "graphql-tag";\nimport {\n  Args,\n  buildSchema,\n  Field,\n  InputType,\n  ObjectType,\n  Query,\n  Resolver,\n} from "type-graphql";\nimport Cursor, {\n  ForwardPaginationArgs,\n  ConnectionType,\n  EdgeType,\n  BackwardPaginationArgs,\n  serializeCursor\n} from "typegraphql-relay-connections";\n\n@ObjectType()\nclass Item {\n  @Field()\n  id!: number;\n}\n\n@ObjectType()\nexport class ItemEdge extends EdgeType(Item) {}\n\n@ObjectType()\nexport class ItemConnection extends ConnectionType({\n  edge: ItemEdge,\n  node: Item,\n}) {}\n\n@InputType()\nclass MyProjectsCursor implements Cursor {\n  @Field()\n  _id!: number;\n\n  [key: string]: unknown;\n}\n\nexport const items = [\n  {\n    id: 1,\n  },\n  {\n    id: 2,\n  },\n  {\n    id: 3,\n  },\n  {\n    id: 4,\n  },\n];\n\n@Resolver(Item)\nexport class ItemResolver {\n  @Query(() => ItemConnection)\n  Items(\n    @Args() forwardPaging: ForwardPaginationArgs,\n    @Args() backwardPaging: BackwardPaginationArgs\n  ): ItemConnection {\n    return {\n      edges: items.map((node) => ({\n        /** You can pick off whatever properties fit your cursor or repeat the whole node */\n        cursor: { id: node.id },\n        node,\n      })),\n      nodes: items,\n      pageInfo: {\n        hasNextPage: false,\n        hasPreviousPage: false,\n        endCursor: items[items.length - 1],\n        startCursor: items[0],\n      },\n    };\n  }\n}\n(async () => {\n  const schema = await buildSchema({\n    resolvers: [ItemResolver],\n  });\n  const result = execute({\n    schema,\n    document: gql`\n      #graphql\n      query ($cursor: Cursor!) {\n        Items {\n          edges {\n            cursor\n            node {\n              id\n            }\n          }\n          nodes {\n            id\n          }\n          pageInfo {\n            hasNextPage\n            hasPreviousPage\n            endCursor\n            startCursor\n          }\n        }\n      }\n    `,\n    variableValues: {\n      cursor: serializeCursor({\n        id: 2,\n      }),\n    },\n  });\n\n  console.log(JSON.stringify(await result, null, 2));\n})();\n'})})]})}function d(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>a});var r=t(7294);const s={},o=r.createContext(s);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);
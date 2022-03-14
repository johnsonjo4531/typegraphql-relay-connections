"use strict";(self.webpackChunktypegraphql_relay_connections_docs=self.webpackChunktypegraphql_relay_connections_docs||[]).push([[924],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return d}});var o=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=o.createContext({}),l=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},s=function(e){var n=l(e.components);return o.createElement(p.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},y=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,s=a(e,["components","mdxType","originalType","parentName"]),y=l(t),d=r,f=y["".concat(p,".").concat(d)]||y[d]||u[d]||i;return t?o.createElement(f,c(c({ref:n},s),{},{components:t})):o.createElement(f,c({ref:n},s))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,c=new Array(i);c[0]=y;var a={};for(var p in n)hasOwnProperty.call(n,p)&&(a[p]=n[p]);a.originalType=e,a.mdxType="string"==typeof e?e:r,c[1]=a;for(var l=2;l<i;l++)c[l]=t[l];return o.createElement.apply(null,c)}return o.createElement.apply(null,t)}y.displayName="MDXCreateElement"},7057:function(e,n,t){t.r(n),t.d(n,{assets:function(){return s},contentTitle:function(){return p},default:function(){return d},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var o=t(7462),r=t(3366),i=(t(7294),t(3905)),c=["components"],a={sidebar_position:2},p="ConnectionType \ud83e\udd94",l={unversionedId:"api/connection-type",id:"api/connection-type",title:"ConnectionType \ud83e\udd94",description:"The ConnectionType function is the slightly more complicated of the two main functions. We'll define a full example below, but if we isolate the ConnectionType by itself you'll see it looks like this:",source:"@site/docs/api/connection-type.md",sourceDirName:"api",slug:"/api/connection-type",permalink:"/typegraphql-relay-connections/docs/api/connection-type",editUrl:"https://github.com/johnsonjo4531/typegraphql-relay-connections/docs/blog/docs/api/connection-type.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"EdgeType \ud83e\uddc0",permalink:"/typegraphql-relay-connections/docs/api/edge-type"},next:{title:"Extending the Builtin Cursor \ud83d\udcc4",permalink:"/typegraphql-relay-connections/docs/tutorials/custom-cursors"}},s={},u=[],y={toc:u};function d(e){var n=e.components,t=(0,r.Z)(e,c);return(0,i.kt)("wrapper",(0,o.Z)({},y,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"connectiontype-"},"ConnectionType \ud83e\udd94"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"ConnectionType")," function is the slightly more complicated of the two main functions. We'll define a full example below, but if we isolate the ConnectionType by itself you'll see it looks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"@ObjectType()\nexport class SongConnection extends ConnectionType({\n  node: Song,\n  edge: SongEdge\n}) {\n  // You can add additional Types to your ConnectionType that are specific to it here:\n}\n")),(0,i.kt)("p",null,"To have a more complete example all you need to do is create a ",(0,i.kt)("inlineCode",{parentName:"p"},"ObjectType")," class, ",(0,i.kt)("inlineCode",{parentName:"p"},"EdgeType")," class, and then plug them in to the ",(0,i.kt)("inlineCode",{parentName:"p"},"ConnectionType")," class:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import {ObjectType, Field} from "type-graphql";\nimport {EdgeType, ConnectionType} from "typegraphql-relay-connections";\n\n// This is our ObjectType:\n@ObjectType()\nclass Song {\n  @Field()\n  id!: string\n\n  @Field()\n  title!: string;\n}\n\n// This is the EdgeType:\n@ObjectType()\nexport class SongEdge extends EdgeType(Song) {}\n\n// This is the ConnectionType:\n@ObjectType()\nexport class SongConnection extends ConnectionType({\n  node: Song,\n  edge: SongEdge\n}) {}\n')))}d.isMDXComponent=!0}}]);
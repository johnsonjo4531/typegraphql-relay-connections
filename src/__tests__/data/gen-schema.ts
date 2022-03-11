import "reflect-metadata";
import path from "path";
import { buildSchema } from "type-graphql";
import { ItemResolver } from ".";

(async () => {
  await buildSchema({
    resolvers: [ItemResolver],
    emitSchemaFile: path.join(__dirname, `../../../schema.gql`),
  });
})();

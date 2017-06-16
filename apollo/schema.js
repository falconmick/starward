import {
  makeExecutableSchema,
} from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import { merge } from 'lodash';
import Settings, { resolvers as settingsResolvers } from './Settings';

const CustomScalars = `
  scalar JSON
`

const RootQuery = `
  type RootQuery {
    settings: Settings
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const rootResolvers = { JSON: GraphQLJSON };
const resolvers = merge(rootResolvers, settingsResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

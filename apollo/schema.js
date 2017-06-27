import {
  makeExecutableSchema,
} from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import { merge } from 'lodash';
import GraphQLDate from './customScalars/Date';
import Settings, { resolvers as settingsResolvers } from './Settings';
import Page, { resolvers as pageResolvers } from './Page';

const CustomScalars = `
  scalar JSON,
  scalar Date
`

const RootQuery = `
  type RootQuery {
    settings: Settings,
    page(slug: String!): Page
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const rootResolvers = { JSON: GraphQLJSON, Date: GraphQLDate };
const resolvers = merge(rootResolvers, settingsResolvers, pageResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings, Page],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

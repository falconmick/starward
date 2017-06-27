import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { AcfLayoutScalarType, DateScalarType } from './customScalars';
import Settings, { resolvers as settingsResolvers } from './Settings';
import Page, { resolvers as pageResolvers } from './Page';

const CustomScalars = `
  scalar Acf
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

const rootResolvers = { Acf: AcfLayoutScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, settingsResolvers, pageResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings, Page],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { RawJsonScalarType, DateScalarType } from './customScalars';
import Settings, { resolvers as settingsResolvers } from './Settings';
import Page, { resolvers as pageResolvers } from './Page';
import MenuItem, { resolvers as menuItemResolvers } from './MenuItem';

const CustomScalars = `
  scalar RawJson
  scalar Date
`

const RootQuery = `
  type RootQuery {
    settings: Settings,
    page(slug: String!): Page
    menuItems(slug: String): [MenuItem]
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, settingsResolvers, pageResolvers, menuItemResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings, Page, MenuItem],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { RawJsonScalarType, DateScalarType } from './customScalars';
import Settings, { resolvers as settingsResolvers } from './Settings';
import Page, { resolvers as pageResolvers } from './Page';
import Menu, { resolvers as menuResolvers } from './Menu';

const CustomScalars = `
  scalar RawJson
  scalar Date
`

const RootQuery = `
  type RootQuery {
    settings: Settings,
    page(slug: String!): Page
    menu: Menu
    menus: [Menu]
    menuItems(menuSlug: String): [MenuItem]
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, settingsResolvers, pageResolvers, menuResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings, Page, Menu],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

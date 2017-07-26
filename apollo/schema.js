import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { RawJsonScalarType, DateScalarType } from './customScalars';
import Settings, { resolvers as settingsResolvers } from './Settings';
import Page, { resolvers as pageResolvers } from './Page';
import MenuItem, { resolvers as menuItemResolvers } from './MenuItem';
import Category, { resolvers as categoryResolvers } from './Category';
import Post, { resolvers as postResolvers } from './Post';
import User, { resolvers as userResolvers } from './User';

const CustomScalars = `
  scalar RawJson
  scalar Date
`

const RootQuery = `
  type RootQuery {
    settings: Settings,
    page(splat: String): Page
    menuItems(slug: String): [MenuItem]
    categories: [Category]
    category(id: Int!): Category
    post(slug: String!): Post
    posts: [Post]
    users: [User]
    user(id: Int!): User
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, settingsResolvers, pageResolvers, menuItemResolvers, categoryResolvers, postResolvers, userResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings, Page, MenuItem, Category, Post, User],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

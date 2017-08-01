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
import Media, { resolvers as mediaResolvers } from './Media';
import Tag, { resolvers as tagResolvers } from './Tag';
import Form, { resolvers as formResolvers } from './Form';

const CustomScalars = `
  scalar RawJson
  scalar Date
`

const RootQuery = `
  type RootQuery {
    settings: Settings,
    page(splat: String): Page
    menuItems(slug: String): [MenuItem]
    categories(listOfIds:[Int!]): [Category]
    category(id: Int!): Category
    post(slug: String!): Post
    posts(page: Int, perPage: Int): PostPager
    users: [User]
    user(id: Int!): User
    media(id: Int!): Media
    tag(id: Int!): Tag
    tags(listOfIds:[Int!]): [Tag!]
    form(formId: Int!): Form
  }
`;
const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, settingsResolvers, pageResolvers,
  menuItemResolvers, categoryResolvers, postResolvers, userResolvers,
  mediaResolvers, tagResolvers, formResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, Settings, Page, MenuItem, Category, Post, User, Media, Tag, Form],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

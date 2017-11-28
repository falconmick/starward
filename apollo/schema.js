import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { RawJsonScalarType, DateScalarType } from './customScalars';
// import Settings, { resolvers as settingsResolvers } from './types/Settings';
// import Page, { resolvers as pageResolvers } from './types/Page';
// import MenuItem, { resolvers as menuItemResolvers } from './types/MenuItem';
// import Category, { resolvers as categoryResolvers } from './types/Category';
// import Post, { resolvers as postResolvers } from './types/Post';
// import User, { resolvers as userResolvers } from './types/User';
// import Media, { resolvers as mediaResolvers } from './types/Media';
// import Tag, { resolvers as tagResolvers } from './types/Tag';
// import Form, { resolvers as formResolvers } from './types/Form';
// import SubmittedForm, { resolvers as submittedFormResolvers } from './types/SubmittedForm';
import apolloModules from './apolloModules';

const CustomScalars = `
  scalar RawJson
  scalar Date
`;

const RootQuery = `
  type RootQuery {
    settings: Settings,
    page(splat: String): Page
    pages(query: String, page: Int, perPage: Int): PagePager
    menuItems(slug: String): [MenuItem]
    categories(listOfIds:[Int!]): [Category]
    category(id: Int!): Category
    post(slug: String!): Post
    posts(query: String, page: Int, perPage: Int): PostPager
    users: [User]
    user(id: Int!): User
    media(id: Int!): Media
    tag(id: Int!): Tag
    tags(listOfIds:[Int!]): [Tag!]
    form(formId: Int!): Form
  }
`;

const RootMutation = `
  type RootMutation {
    submitForm(form: SubmittedFormInput!): SubmittedForm!
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, ...apolloModules.resolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, RootMutation, ...apolloModules.typeDefFuncs],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
// import { RawJsonScalarType, DateScalarType } from './customScalars';
import Book, { resolvers as bookResolvers } from './types/Book';
import Genre, { resolvers as genreResolvers } from './types/Genre';

const CustomScalars = `
  ... scalars here ....
`;

const RootQuery = `
  type RootQuery {
    .... other queries here ......
    
    book(slug: String!): Book
    books(query: String, page: Int, perPage: Int): BookPager
    genres(listOfIds:[Int!]): [Category]
    genre(id: Int!): Category
  }
`;

const RootMutation = `
  type RootMutation {
    ..... mutations here .....
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const rootResolvers = {/* scalars */};
const resolvers = merge(rootResolvers,
  bookResolvers, genreResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, RootQuery, RootMutation, Book, Genre],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

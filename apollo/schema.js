import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { RawJsonScalarType, DateScalarType } from './customScalars';
import { getModule } from './apolloModules';

const { resolvers: moduleResolvers, types } = getModule();

const CustomScalars = `
  scalar RawJson
  scalar Date
`;

// todo: attempt to add fields in here to make the schema compile
const schemaTypes = `
  type RootQuery {}
  type RootMutation {}
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, moduleResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, schemaTypes, ...types],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

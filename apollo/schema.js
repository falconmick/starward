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

// unfortunatly I cannot have an empty type (RootQuery is built via extending) so I had to add version.
const schemaTypes = `
  type RootQuery {
    version: String!
  }
  type RootMutation {
    version: String!
  }
`;

const dummyFieldResolvers = {
  RootQuery: {
    version: () => '1.0.0',
  },
  RootMutation: {
    version: () => '1.0.0',
  }
};

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, dummyFieldResolvers, moduleResolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, schemaTypes, ...types],
  resolvers,
  resolverValidationOptions: {
    // requireResolversForAllFields: false,
    requireResolversForResolveType: false
  }
});

import {
  makeExecutableSchema,
} from 'graphql-tools';
import { merge } from 'lodash';
import { RawJsonScalarType, DateScalarType } from './customScalars';
import { getModule } from './apolloModules';

const apolloModules = getModule();

const CustomScalars = `
  scalar RawJson
  scalar Date
`;


const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`;

const rootResolvers = { RawJson: RawJsonScalarType, Date: DateScalarType };
const resolvers = merge(rootResolvers, apolloModules.resolvers);

export default makeExecutableSchema({
  typeDefs: [CustomScalars, SchemaDefinition, apolloModules.rootQueryType, apolloModules.rootMutationType, ...apolloModules.type],
  resolvers,
  resolverValidationOptions: {
    requireResolversForAllFields: false
  }
});

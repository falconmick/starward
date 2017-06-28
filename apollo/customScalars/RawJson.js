import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const RawJsonScalarType = new GraphQLScalarType({
  name: 'RawJson',
  description: 'Raw JSON with unknown schema',
  parseValue(value) {
    return value; // value from the client
  },
  serialize(value) {
    return value; // value from the client
  },
  parseLiteral(ast) {
    // if (ast.kind === Kind.LIST) {
    //   return parseInt(ast.value, 10); // ast value is always in string format
    // }
    return null;
  },
});

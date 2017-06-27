import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const AcfLayoutScalarType = new GraphQLScalarType({
  name: 'Acf',
  description: 'DateTime custom scalar type',
  parseValue(value) {
    return value; // value from the client
  },
  serialize(value) {
    return value; // value from the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.LIST) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

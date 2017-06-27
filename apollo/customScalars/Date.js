import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const DateScalarType = new GraphQLScalarType({
    name: 'Date',
    description: 'DateTime custom scalar type',
    parseValue(value) {
      return value; // value from the client
    },
    serialize(value) {
      return new Date(value); // value from the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  });
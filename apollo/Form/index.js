/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *

 */
const Form = `
type Form {
    id: ID!
}
`;

export default () => [Form];
export { resolvers } from './formResolver';
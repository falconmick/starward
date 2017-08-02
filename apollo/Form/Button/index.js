/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *

 */
const Button = `
type Button {
  type: String!
  text: String!
  imageUrl: String
}
`;

export default () => [Button];
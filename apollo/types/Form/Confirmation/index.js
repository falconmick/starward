/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
 */
const Confirmation = `
type Confirmation {
  id: ID!
  name: String!
  isDefault: Boolean!
  # todo: Test having a redirect
  type: String!
  message: String
  url: String
  pageId: String
  queryString: String
}
`;

export default () => [Confirmation];
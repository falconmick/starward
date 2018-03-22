/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
 fragment menuFragment on MenuItem {
    url
    title
    classes
  }

 {
   headerMenu: menuItem(slug:"primary_navigation") {
     ...menuFragment
     children {
       ...menuFragment
         children {
         ...menuFragment
       }
     }
   }
 }
 */
const MenuItem = `
type MenuItem {
    ID: ID!
    order: Int!
    parent: Int!
    title: String!
    url: String!
    attr: String!
    target: String!
    classes: String!
    xfn: String!
    description: String!
    object_id: Int!
    object: String!
    type: String!
    type_label: String!
    children: [MenuItem]
}
`;

export default () => [MenuItem];
export { resolvers } from './menuItemResolver';
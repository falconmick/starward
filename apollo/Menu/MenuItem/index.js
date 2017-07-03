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
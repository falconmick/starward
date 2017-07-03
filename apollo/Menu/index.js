import MenuItem from './MenuItem';

const Menu = `
type Menu {
    ID: ID!
    label: String!
    menuItems: [MenuItem]
}
`;

export default () => [Menu, MenuItem];
export { resolvers } from './menuResolvers';

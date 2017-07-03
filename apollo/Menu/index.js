import { merge } from 'lodash';
import { resolvers as menuResolvers } from './menuResolvers';
import MenuItem, { resolvers as menuItemResolvers } from './MenuItem';

const Menu = `
type Menu {
    ID: ID!
    slug: String!
    label: String!
    menuItems: [MenuItem]
}
`;

export default () => [Menu, MenuItem];
export const resolvers = merge(menuResolvers, menuItemResolvers);

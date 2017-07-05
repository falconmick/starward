import Yoast from '../Yoast';

const Category = `
type Category {
    id: ID!
    count: Int!
    description: String!
    link: String!
    name: String!
    slug: String!
    taxonomy: String!
    parent: Int!
    yoast: Yoast!
}
`;

export default () => [Category, Yoast];
export { resolvers } from './categoryResolver';
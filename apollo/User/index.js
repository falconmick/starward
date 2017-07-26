
const User = `
type User {
    id: ID!
    name: String!
    url: String
    description: String
    slug: String!
    avatar_urls: RawJson
    meta: [String]!
}
`;

export default () => [User];
export { resolvers } from './userResolvers';

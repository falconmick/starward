const Tag = `
type Tag {
    id: ID!
    name: String!
    url: String
    description: String
    slug: String!
    avatar_urls: RawJson
    meta: [String]!
}
`;

export default () => [Tag];
export { resolvers } from './tagResolvers';

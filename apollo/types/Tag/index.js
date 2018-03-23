/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
 query TagQuery {
    tags {
      ...tagFragment
    }
    idListTag:tags(listOfIds:[9,6]) {
      ...tagFragment
    }
    tag(id:9) {
      ...tagFragment
    }
  }

 fragment tagFragment on Tag {
    id
    name
    slug
  }
 */
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

extend type RootQuery {
    tag(id: Int!): Tag
    tags(listOfIds:[Int!]): [Tag!]
}
`;

export default () => [Tag];
export { resolvers } from './tagResolvers';

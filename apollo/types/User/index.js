/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
 query UserQuery {
  user(id:1) {
    ...userFragment
  }
  users {
  	...userFragment
  }
}

 fragment userFragment on User {
		id
    name
    avatar_urls
}
 */
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

extend type RootQuery {
    users: [User]
    user(id: Int!): User
}
`;

export default () => [User];
export { resolvers } from './userResolvers';

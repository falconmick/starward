import MediaDetail from './MediaDetail/index';

/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
  {
    media(id:49){
      id
      slug
      guid {
        rendered
      }
    }
  }

  fragment mediaFrag on Media {
  }
 */
const Media = `
type Media {
    id: ID!
    # in UTC time
    created: Date!
    # in UTC time
    modified: Date
    # contains a raw link to the resource, media_details is the better way to do this
    guid: String!
    url: String!
    slug: String!
    status: String!
    type: String!
    link: String!
    title: String!
    author: Int!
    comment_status: String!
    ping_status: String!
    template: String!
    meta: [String]!
    caption: String!
    alt_text: String
    media_type: String
    mime_type: String
    # contains original url, dimentions and thumbs
    media_details: MediaDetail!
}
`;

export default () => [Media, MediaDetail];
export { resolvers } from './mediaResolvers';

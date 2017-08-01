import WpContent from '../WpContent';
import MediaDetail from './MediaDetail';

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
    date: Date!
    date_gmt: Date!
    # contains a raw link to the resource, media_details is the better way to do this
    guid: WpContent
    url: String!
    modified: Date
    modified_gmt: Date
    slug: String!
    status: String!
    type: String!
    link: String!
    title: WpContent!
    author: Int!
    comment_status: String!
    ping_status: String!
    template: String!
    meta: [String]!
    caption: WpContent!
    alt_text: String
    media_type: String
    mime_type: String
    # contains original url, dimentions and thumbs
    media_details: MediaDetail!
}
`;

export default () => [Media, WpContent, MediaDetail];
export { resolvers } from './mediaResolvers';

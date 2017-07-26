import WpContent from '../WpContent';
import MediaDetail from './MediaDetail';

const Media = `
type Media {
    id: ID!
    date: Date!
    date_gmt: Date!
    guid: WpContent
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
    media_details: MediaDetail!
}
`;

export default () => [Media, WpContent, MediaDetail];
export { resolvers } from './mediaResolvers';

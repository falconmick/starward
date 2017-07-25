import WpContent from '../WpContent';
import Yoast from '../Yoast';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Acf from '../Acf';

const Page = `
type Page {
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
    content: WpContent!
    excerpt: WpContent!
    author: Int!
    featured_media: Int!
    parent: Int!
    menu_order: Int!
    comment_status: String!
    ping_status: String!
    template: String!
    meta: [String]!
    better_featured_image: BetterFeaturedImage
    yoast: Yoast!
    acf: Acf!
}
`;

export default () => [Page, WpContent, Yoast, Acf, BetterFeaturedImage];
export { resolvers } from './pageResolvers';

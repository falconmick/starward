import WpContent from '../WpContent';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Yoast from '../Yoast';
import Acf from '../Acf';

const Post = `
type Settings {
    id: ID!,
    date: Date!,
    date_gmt: Date!,
    modified: Date!,
    modified_gmt: Date!,
    slug: String!,
    status: String!,
    type: String!,
    title: WpContent!,
    content: WpContent!,
    excerpt: WpContent!,
    author: Int!,
    featured_media: Int!,
    comment_status: String!,
    ping_status: String!,
    sticky: Boolean!,
    template: String!,
    format: String!,
    meta" [String]!,
    categories: [Number]!,
    tags: [Number]!,
    better_featured_image: BetterFeaturedImage!,
    yoast: Yoast!,
    acf: Acf!,
    
}
`;

export default () => [Post, WpContent, BetterFeaturedImage, Yoast, Acf];
export { resolvers } from './postResolvers';

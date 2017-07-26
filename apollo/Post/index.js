import WpContent from '../WpContent';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Yoast from '../Yoast';
import Acf from '../Acf';
import Category from '../Category';
import User from '../User';

const Post = `
type Post {
    id: ID!
    date: Date!
    date_gmt: Date!
    guid: WpContent
    modified: Date!
    modified_gmt: Date!
    slug: String!
    status: String!
    type: String!
    link: String!
    title: WpContent!
    content: WpContent!
    excerpt: WpContent!
    author: User!
    featured_media: Int!
    comment_status: String!
    ping_status: String!
    sticky: Boolean!
    template: String!
    format: String!
    meta: [String]!
    categories: [Category]!
    tags: [Int]!
    better_featured_image: BetterFeaturedImage
    yoast: Yoast!
    acf: Acf!
}
`;

export default () => [Post, WpContent, BetterFeaturedImage, Yoast, Acf, Category, User];
export { resolvers } from './postResolvers';

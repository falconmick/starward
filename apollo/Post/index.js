import WpContent from '../WpContent';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Yoast from '../Yoast';
import Acf from '../Acf';
import Category from '../Category';
import User from '../User';
import Media from '../Media';
import Tag from '../Tag';
import { createPagableType } from '../utils/pager';

/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
  query PostQuery {
    posts {
      ...postFragment
    }
    post(slug:"second-post") {
      ...postFragment
    }
  }

  fragment postFragment on Post {
    id
    slug
    content {
      rendered
    }
  }
 */
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
    title: String!
    content: WpContent!
    excerpt: String!
    author: User!
    featured_media: Media
    comment_status: String!
    ping_status: String!
    sticky: Boolean!
    template: String!
    format: String!
    meta: [String]!
    categories: [Category]!
    tags: [Tag]!
    better_featured_image: BetterFeaturedImage
    yoast: Yoast!
    acf: Acf!
}
`;

const PaginatedPostType = createPagableType('Post');

export default () => [Post, PaginatedPostType, WpContent, BetterFeaturedImage, Yoast, Acf, Category, User, Media, Tag];
export { resolvers } from './postResolvers';
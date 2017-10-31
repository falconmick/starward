import WpContent from '../WpContent/index';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Yoast from '../Yoast/index';
import Acf from '../Acf';
import Category from '../Category';
import User from '../User/index';
import Media from '../Media';
import Tag from '../Tag/index';
import { createPagableType } from '../../utils/pager';

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
    # in UTC time
    created: Date!
    # in UTC time
    modified: Date!
    guid: WpContent
    slug: String!
    status: String!
    type: String!
    link: String!
    title: String!
    content: String!
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

import WpContent from '../WpContent/index';
import Yoast from '../Yoast/index';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Acf from '../Acf';
import { createPagableType } from '../../utils/pager';

/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
  query PageQuery($splat: String) {
    page(splat: $splat) {
      acf {
        layout
      }
      yoast {
        focuskw
        title
        metadesc
        linkdex
        metakeywords
        canonical
        redirect
      }
    }
  }
 */
const Page = `
type Page {
    id: ID!
    # in UTC time
    created: Date!
    # in UTC time
    modified: Date
    guid: WpContent
    slug: String!
    status: String!
    type: String!
    link: String!
    title: String!
    content: String!
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

const PaginatedPostType = createPagableType('Page');

export default () => [Page, PaginatedPostType, WpContent, Yoast, Acf, BetterFeaturedImage];
export { resolvers } from './pageResolvers';

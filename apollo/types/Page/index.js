import Yoast from '../Yoast/index';
import BetterFeaturedImage from '../BetterFeaturedImage';
import Acf from '../Acf';
import { createPagableType } from '../../utils/pager';
import { resolvers } from './pageResolvers';
import { apolloBundle } from '../../utils/apolloBundle';

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
    guid: String!
    slug: String!
    status: String!
    type: String!
    link: String!
    title: String!
    content: String!
    excerpt: String!
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

export const PageBundle = apolloBundle({
  type: Page,
  dependencies: [PaginatedPostType, Yoast, Acf, BetterFeaturedImage],
  resolvers,
});

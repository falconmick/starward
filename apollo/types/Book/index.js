import Yoast from '../Yoast/index';
import Acf from '../Acf';
import Genre from '../Genre';
import PostType from '../../interface/postType';
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
const Book = `
type Book implements PostType {
    id: ID!
    # in UTC time
    created: Date!
    # in UTC time
    modified: Date!
    guid: String!
    slug: String!
    status: String!
    type: String!
    link: String!
    title: String!
    content: String!
    yoast: Yoast!
    acf: Acf!
    genres: [Genre]!
}
`;

const PaginatedPostType = createPagableType('Book');

export default () => [Book, PaginatedPostType, Yoast, Acf, Genre, PostType];
export { resolvers } from './bookResolvers';

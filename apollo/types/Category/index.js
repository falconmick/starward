import Yoast from '../Yoast/index';
import Taxonomy from '../../interface/taxonomy';
import { resolvers } from './categoryResolver';
import { apolloBundle } from '../../utils/apolloBundle';

/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
  {
    categories(listOfIds:[1,5]) {
      ...catFrag
    }
    allCategories: categories {
      ...catFrag
    }
    category(id:1){
      ...catFrag
    }
  }

   fragment catFrag on Category {
    id
    description
    name
  }
 */
const Category = `
type Category implements Taxonomy {
    id: ID!
    count: Int!
    description: String!
    link: String!
    name: String!
    slug: String!
    taxonomy: String!
    parent: Int!
    yoast: Yoast!
}
`;

export const CategoryBundle = apolloBundle({
  type: Category,
  dependencies: [Yoast, Taxonomy],
  resolvers,
});

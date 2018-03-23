import Yoast from '../Yoast';
import Taxonomy from '../../interface/taxonomy';

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

extend type RootQuery {
    categories(listOfIds:[Int!]): [Category]
    category(id: Int!): Category
}
`;

export default () => [Category, Yoast, Taxonomy];
export { resolvers } from './categoryResolver';

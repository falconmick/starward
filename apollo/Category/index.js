import Yoast from '../Yoast';

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
type Category {
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

export default () => [Category, Yoast];
export { resolvers } from './categoryResolver';
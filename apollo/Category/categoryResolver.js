import { getCategories, getCategory } from './categoryQueries';
import { resolveDashCase } from '../utils/resolverTools';

export const resolvers = {
  RootQuery: {
    categories: getCategories,
    category: getCategory
  },
  Category: {
    yoast: ({yoast}) => {
      return resolveDashCase(yoast);
    },
  }
};

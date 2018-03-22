import { resolveDashCase } from '../../utils/resolverTools';
import { getCategories, getCategory } from './categoryQueries';

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

import { getCategories, getCategory } from './categoryQueries';
import { resolveDashCase } from '../../utils/resolverTools';

export const acfResolversresolvers = {
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

import { getCategories, getCategory } from './categoryQueries';

export const resolvers = {
  RootQuery: {
    categories: getCategories,
    category: getCategory
  }
};

import query from './categoryQueries';

export const resolvers = {
  RootQuery: {
    categories: query
  }
};

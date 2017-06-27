import query from './pageQueries';

export const resolvers = {
  RootQuery: {
    page: query,
  },
};

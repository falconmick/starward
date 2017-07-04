import query from './menuItemQueries';

export const resolvers = {
  RootQuery: {
    menuItems: query
  }
};

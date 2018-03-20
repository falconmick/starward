import { getMenuItem } from './menuItemQueries';

export const resolvers = {
  RootQuery: {
    menuItem: getMenuItem,
  }
};

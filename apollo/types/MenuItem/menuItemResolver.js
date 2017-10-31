import { getMedia } from './menuItemQueries';

export const resolvers = {
  RootQuery: {
    menuItems: getMedia,
  }
};

import { getListOfMenus, getMenu } from './menuQueries';

export const resolvers = {
  RootQuery: {
    menus: getListOfMenus,
    menu: getMenu
  },
};

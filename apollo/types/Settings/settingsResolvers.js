import { getSettings } from './settingsQueries';

export const resolvers = {
  RootQuery: {
    settings: getSettings,
  },
};

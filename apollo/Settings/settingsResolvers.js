import query from './settingsQueries';

export const resolvers = {
  RootQuery: {
    settings: query,
  },
};

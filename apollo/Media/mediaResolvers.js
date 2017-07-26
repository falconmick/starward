import { getMedia } from './mediaQueries';

export const resolvers = {
  RootQuery: {
    media: getMedia,
  },
};

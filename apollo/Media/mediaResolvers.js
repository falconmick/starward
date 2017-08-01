import { getMedia } from './mediaQueries';

export const resolvers = {
  RootQuery: {
    media: getMedia,
  },
  Media: {
    url: ({guid}) => {
      return guid && guid.rendered ? guid.rendered : '';
    }
  }
};

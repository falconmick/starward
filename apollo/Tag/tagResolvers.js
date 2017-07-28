import { getTags, getTag } from './tagQueries';

export const resolvers = {
  RootQuery: {
    tags: getTags,
    tag: getTag
  }
};

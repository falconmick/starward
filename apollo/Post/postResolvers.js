import { getPost, getPosts } from './postQueries';

export const resolvers = {
  RootQuery: {
    post: getPost,
    posts: getPosts
  },
};

import { getPost, getPosts } from './postQueries';
import { getCategories } from '../Category/categoryQueries';

export const resolvers = {
  RootQuery: {
    post: getPost,
    posts: getPosts
  },
  Post: {
    categories: (post) => {
      return getCategories(null, {listOfIds: post.categories});
    }
  }
};

import { getPost, getPosts } from './postQueries';
import { getCategories } from '../Category/categoryQueries';
import { getUser } from '../User/userQueries'

export const resolvers = {
  RootQuery: {
    post: getPost,
    posts: getPosts
  },
  Post: {
    categories: (post) => {
      return getCategories(null, {listOfIds: post.categories});
    },
    author: (post) => {
      return getUser(null, {id: post.author});
    },
  },
};

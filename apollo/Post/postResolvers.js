import { getPost, getPosts } from './postQueries';
import { getCategories } from '../Category/categoryQueries';
import { getUser } from '../User/userQueries';
import { getMedia } from '../Media/mediaQueries';

export const resolvers = {
  RootQuery: {
    post: getPost,
    posts: getPosts
  },
  Post: {
    categories: ({categories}) => {
      return getCategories(null, {listOfIds: categories});
    },
    author: ({author}) => {
      return getUser(null, {id: author});
    },
    featured_media: ({featured_media}) => {
      if (!featured_media || featured_media === 0) {
        return null;
      }
      return getMedia(null, {id: featured_media});
    }
  },
};

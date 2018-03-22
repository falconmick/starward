import { getCategories } from '../Category/categoryQueries';
import { getTags } from '../Tag/tagQueries';
import { basePostTypeResolvers, excerptResolvers, featuredMediaResolvers, authorResolvers } from '../../utils/postTypeResolver';
import { postQueryFactory } from '../../factory/postType/postQueryFactory';

const { getPost, getPosts } = postQueryFactory({apiEndpoint: 'posts'});

export const resolvers = {
  RootQuery: {
    post: getPost,
    posts: getPosts
  },
  Post: {
    categories: ({categories}) => {
      return getCategories(null, {listOfIds: categories});
    },
    tags: ({tags}) => {
      return getTags(null, {listOfIds: tags});
    },
    ...authorResolvers,
    ...featuredMediaResolvers,
    ...excerptResolvers,
    ...basePostTypeResolvers
  },
};

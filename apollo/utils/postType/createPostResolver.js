import { authorResolvers, basePostTypeResolvers, featuredMediaResolvers, excerptResolvers } from '../postTypeResolver';
import { getPost, getPosts } from '../../types/Post/postQueries';

export const createResolver = ({typeName, singleQueryName, archiveQueryName}) => ({
  RootQuery: {
    [singleQueryName]: getPost,
    [archiveQueryName]: getPosts
  },
  [typeName]: {
    // categories: ({categories}) => {
    //   return getCategories(null, {listOfIds: categories});
    // },
    // tags: ({tags}) => {
    //   return getTags(null, {listOfIds: tags});
    // },
    ...authorResolvers,
    ...featuredMediaResolvers,
    ...excerptResolvers,
    ...basePostTypeResolvers
  },
});
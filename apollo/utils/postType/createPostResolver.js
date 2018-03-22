import { authorResolvers, basePostTypeResolvers, featuredMediaResolvers, excerptResolvers } from '../postTypeResolver';
import { postQueryFactory } from './postQueryFactory';

export const createResolver = ({typeName, singleQueryName, archiveQueryName, typeNameCamelCase, apiEndpoint}) => {
  const { getPost, getPosts } = postQueryFactory({typeNameCamelCase, apiEndpoint});

  return {
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
  }
};
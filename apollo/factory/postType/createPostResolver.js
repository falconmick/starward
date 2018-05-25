import { postQueryFactory } from '../../utils/postQueryFactory';
import {
  authorResolvers, basePostTypeResolvers, excerptResolvers,
  featuredMediaResolvers
} from '../../utils/postTypeResolver';


export const createResolver = ({typeName, singleQueryName, archiveQueryName, typeNameCamelCase, apiEndpoint}) => {
  const { getPost, getPosts } = postQueryFactory({typeNameCamelCase, apiEndpoint});

  const typeResolver = {
    ...authorResolvers,
    ...featuredMediaResolvers,
    ...excerptResolvers,
    ...basePostTypeResolvers,
  };

  return {
    RootQuery: {
      [singleQueryName]: getPost,
      [archiveQueryName]: getPosts
    },
    [typeName]: typeResolver,
  };
};

import {
  authorResolvers, basePostTypeResolvers, excerptResolvers,
  featuredMediaResolvers
} from '../../utils/postTypeResolver';


export const createResolver = ({typeName, singleQueryName, archiveQueryName, getPost, getPosts}) => {
  const typeResolver = {
    ...authorResolvers,
    ...featuredMediaResolvers,
    ...excerptResolvers,
    ...basePostTypeResolvers,
  };

  return {
    RootQuery: {
      [singleQueryName]: getPost,
      [archiveQueryName]: getPosts(), // this query is also used by taxonomies who need to inject stuff here, we don't need to!
    },
    [typeName]: typeResolver,
  };
};

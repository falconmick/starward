import { apolloBundle } from '../apolloBundle';
import { createPagableType } from '../pager';
import { createType } from './createPostType';
import { createResolver } from './createPostResolver';
import { createRootQuery } from './createPostRootQuery';

export const createPostType = ({typeName, queryName} = {}) => {
  if (!typeName) {
    console.error('typeName is a required argument of createPostTypeType');
  }

  const { single, archive } = queryName || {};
  const singleQueryName = single || typeName[0].toLowerCase() + typeName.slice(1);
  const archiveQueryName = archive || singleQueryName + 's';

  // create the post and archive GraphQL Types
  const postTypeString = createType({typeName});
  const paginatedTypeString = createPagableType(typeName);
  const type = () => [postTypeString, paginatedTypeString];

  // create the post and archive resolvers
  const resolvers = createResolver({typeName, singleQueryName, archiveQueryName});

  // generate the string for the Root Query
  const rootQuery = createRootQuery({archiveQueryName, singleQueryName, typeName});

  // bundle the type and resolver
  const bundle = apolloBundle({type, resolvers});

  return {
    bundle,
    rootQuery,
  };
};

import { apolloBundle } from '../../utils/apolloBundle';
import { createPagableType } from '../../utils/pager';
import { createType } from './createPostType';
import { createRootQuery } from './createPostRootQuery';
import { createResolver } from './createPostResolver';

export const postTypeFactory = ({typeName, queryName, apiEndpoint, taxonomies = []} = {}) => {
  if (!typeName) {
    console.error('typeName is a required argument of createPostTypeType');
  }

  const taxonomyTypeArray = taxonomies.map(({taxonomyType}) => taxonomyType);

  const { single, archive } = queryName || {};
  const typeNameCamelCase = typeName[0].toLowerCase() + typeName.slice(1);
  const singleQueryName = single || typeNameCamelCase;
  const archiveQueryName = archive || singleQueryName + 's';

  // create the post and archive GraphQL Types
  const postTypeString = createType({typeName, taxonomies});
  const paginatedTypeString = createPagableType(typeName);
  const type = () => [postTypeString, paginatedTypeString, ...taxonomyTypeArray];

  // create the post and archive resolvers
  const resolvers = createResolver({typeName, singleQueryName, archiveQueryName, typeNameCamelCase, apiEndpoint, taxonomies});

  // generate the string for the Root Query
  const rootQuery = createRootQuery({archiveQueryName, singleQueryName, typeName});

  // bundle the type and resolver
  const bundle = apolloBundle({type, resolvers});

  return {
    bundle,
    rootQuery,
  };
};

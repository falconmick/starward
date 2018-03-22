import { apolloBundle } from '../../utils/apolloBundle';
import { createPagableType } from '../../utils/pager';
import { createType } from './createPostType';
import { createRootQuery } from './createPostRootQuery';
import { createResolver } from './createPostResolver';

/**
 *
 * @param typeName
 * @param queryName
 * @param apiEndpoint
 * @param taxonomies
 * @param acf: used so we can choose to use a non default flexible conten (inside ACF, post might have it's own Flexible Content!
 * @returns {{bundle, rootQuery: *}}
 */
export const postTypeFactory = ({typeName, queryName, apiEndpoint, taxonomies = [], acf = {}} = {}) => {
  if (!typeName) {
    console.error('typeName is a required argument of createPostTypeType');
  }

  const taxonomyTypeArray = taxonomies.map(({taxonomyType}) => taxonomyType);

  // if no type, an empty array is fine!!
  const { acfType = () => [], acfTypeName } = acf;

  const { single, archive } = queryName || {};
  const typeNameCamelCase = typeName[0].toLowerCase() + typeName.slice(1);
  const singleQueryName = single || typeNameCamelCase;
  const archiveQueryName = archive || singleQueryName + 's';

  // create the post and archive GraphQL Types
  const postTypeString = createType({typeName, taxonomies, acfTypeName});
  const paginatedTypeString = createPagableType(typeName);
  const type = () => [postTypeString, paginatedTypeString, acfType, ...taxonomyTypeArray];

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

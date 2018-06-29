import { apolloBundle } from '../../utils/apolloBundle';
import { createPagableType } from '../../utils/pager';
import { createType } from './createPostType';
import { createResolver } from './createPostResolver';
import { postQueryFactory } from '../../utils/postQueryFactory';
import PostType from '../../interface/postType';

/**
 *
 * @param typeName
 * @param queryName
 * @param apiEndpoint
 * @param acf: used so we can choose to use a non default flexible conten (inside ACF, post might have it's own Flexible Content!
 * @returns {{bundle, rootQuery: *}}
 */
export const postTypeFactory = ({typeName, queryName, apiEndpoint, acf = {}} = {}) => {
  if (!typeName) {
    console.error('typeName is a required argument of createPostTypeType');
  }

  // if no type, an empty array is fine!!
  const { acfType = () => [], acfTypeName } = acf;

  const { single, archive } = queryName || {};
  const typeNameCamelCase = typeName[0].toLowerCase() + typeName.slice(1);
  const singleQueryName = single || typeNameCamelCase;
  const archiveQueryName = archive || singleQueryName + 's';

  // create the post and archive GraphQL Types
  const postTypeString = createType({typeName, acfTypeName, archiveQueryName, singleQueryName});
  const paginatedTypeString = createPagableType(typeName);
  const type = () => [postTypeString, paginatedTypeString, acfType, PostType];

  // create the post and archive resolvers
  const { getPost, getPosts } = postQueryFactory({typeNameCamelCase, apiEndpoint});
  const resolvers = createResolver({typeName, singleQueryName, archiveQueryName, getPost, getPosts});

  // bundle the type and resolver
  const bundle = apolloBundle({type, resolvers});

  return {
    bundle,
    getPosts,
  };
};

import { createWordpressGraphqlProxy, resultArrayToSingle } from './queryTools';
import { createPaginationCallback, createPostPagerKey } from './pager';
import { cacheResolver } from './redis';

const resolveTaxonomyBooks = (obj = {}, args) => {
  // if it's not a taxonomy calling this, we don't care
  if (!obj.taxonomy) {
    return {};
  }
  const taxonomyId = obj.id;

  return {
    taxonomyId
  };
};

export const postQueryFactory = ({typeNameCamelCase, apiEndpoint}) => {
  const typeNameCamelCasePlural = typeNameCamelCase + 's';
  const wpApiLocation = `wp/v2/${apiEndpoint || typeNameCamelCasePlural}`;

  // default api endpoint for posts: wp/v2/posts
  const wpPostProxy = createWordpressGraphqlProxy(wpApiLocation);

  const _getPosts = ({taxonomyField} = {}) => cacheResolver(`${wpApiLocation}-archive`, {
    additionalArgsMapper: resolveTaxonomyBooks
  })((obj, args, additionalArgs) => {
    const { query, page = 1, perPage = 10 } = args;
    const { taxonomyId } = additionalArgs;
    let queryArgs = {};

    if (query) {
      queryArgs.search = query;
    }

    if (taxonomyId) {
      queryArgs[taxonomyField] = taxonomyId;
    }

    const id = createPostPagerKey({page, perPage, query});
    const paginationCallback = createPaginationCallback(page, perPage, id);
    return wpPostProxy.selectPage({ dataCallback: paginationCallback, page, perPage, queryArgs });
  });

  const _getPost = cacheResolver(`${wpApiLocation}-single`)((obj, args) => {
    const { slug = '' } = args;
    return wpPostProxy.select(slug, { dataCallback: resultArrayToSingle, idPrefix: '?slug=' });
  });

  return {
    getPost: _getPost,
    getPosts: _getPosts,
  };
};

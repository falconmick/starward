import { createWordpressGraphqlProxy, resultArrayToSingle } from '../queryTools';
import { createPaginationCallback, createPostPagerKey } from '../pager';
import { cacheResolver } from '../redis';

export const postQueryFactory = ({typeNameCamelCase, apiEndpoint}) => {
  const typeNameCamelCasePlural = typeNameCamelCase + 's';
  const wpApiLocation = `wp/v2/${apiEndpoint || typeNameCamelCasePlural}`;

  // default api endpoint for posts: wp/v2/posts
  const wpPostProxy = createWordpressGraphqlProxy(wpApiLocation);

  const _getPosts = cacheResolver('getPosts')((obj, args) => {
    const { query, page = 1, perPage = 10 } = args;
    let queryArgs = {
      search: query,
    };
    if (!query) {
      queryArgs = {};
    }
    const id = createPostPagerKey({page, perPage, query});
    const paginationCallback = createPaginationCallback(page, perPage, id);
    return wpPostProxy.selectPage({ dataCallback: paginationCallback, page, perPage, queryArgs });
  });

  const _getPost = cacheResolver('getPost')((obj, args) => {
    const { slug = '' } = args;
    return wpPostProxy.select(slug, { dataCallback: resultArrayToSingle, idPrefix: '?slug=' });
  });

  return {
    getPost: _getPost,
    getPosts: _getPosts,
  };
};

import { createWordpressGraphqlProxy, resultArrayToSingle } from '../../utils/queryTools';
import { createPaginationCallback, createPostPagerKey } from '../../utils/pager';
import { cacheResolver } from '../../utils/redis';

const wpPostProxy = createWordpressGraphqlProxy('wp/v2/posts');

export const getPosts = cacheResolver('getPosts')((obj, args) => {
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

export const getPost = cacheResolver('getPost')((obj, args) => {
  const { slug = '' } = args;
  return wpPostProxy.select(slug, { dataCallback: resultArrayToSingle, idPrefix: '?slug=' });
});

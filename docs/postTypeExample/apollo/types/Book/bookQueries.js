import { createWordpressGraphqlProxy, resultArrayToSingle } from '../../utils/queryTools';
import { createPaginationCallback, createPostPagerKey } from '../../utils/pager';
import { cacheResolver } from '../../utils/redis';

const wpBookProxy = createWordpressGraphqlProxy('wp/v2/books-api');

export const getBooks = cacheResolver('getBooks')((obj, args) => {
  const { query, page = 1, perPage = 10 } = args;
  let queryArgs = {
    search: query,
  };
  if (!query) {
    queryArgs = {};
  }
  const id = createPostPagerKey({page, perPage, query});
  const paginationCallback = createPaginationCallback(page, perPage, id);
  return wpBookProxy.selectPage({ dataCallback: paginationCallback, page, perPage, queryArgs });
});

export const getBook = cacheResolver('getBook')((obj, args) => {
  const { slug = '' } = args;
  return wpBookProxy.select(slug, { dataCallback: resultArrayToSingle, idPrefix: '?slug=' });
});

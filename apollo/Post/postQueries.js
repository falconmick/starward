import { createWordpressGraphqlProxy, resultArrayToSingle } from '../utils/queryTools';
import { createPaginationCallback, createIdFromArgs } from '../utils/pager';

const wpPostProxy = createWordpressGraphqlProxy('wp/v2/posts');

export const getPosts = (obj, args) => {
  const { page = 1, perPage = 10 } = args;
  const id = createIdFromArgs(page, perPage);
  const paginationCallback = createPaginationCallback(page, perPage, id);
  return wpPostProxy.selectPage({ dataCallback: paginationCallback, page, perPage });
};

export const getPost = (obj, args) => {
  const { slug = '' } = args;
  return wpPostProxy.select(slug, { dataCallback: resultArrayToSingle, idPrefix: '?slug=' });
};

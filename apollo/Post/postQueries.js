import { createWordpressGraphqlProxy, resultArrayToSingle } from '../utils/queryTools';

const wpPostProxy = createWordpressGraphqlProxy('wp/v2/posts');

export const getPosts = () => {
  return wpPostProxy.selectAll();
};

export const getPost = (obj, args) => {
  const { slug = '' } = args;
  return wpPostProxy.select(slug, { dataCallback: resultArrayToSingle, idPrefix: '?slug=' });
};

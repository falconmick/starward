import { createWordpressGraphqlProxy } from '../utils/queryTools';

const wpMediaProxy = createWordpressGraphqlProxy('wp/v2/media');

export const getMedia = (obj, { id }) => {
  return wpMediaProxy.select(id);
};

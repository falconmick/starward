import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpMediaProxy = createWordpressGraphqlProxy('wp/v2/media');

export const getMedia = cacheResolver('getMedia')((obj, { id }) => {
  return wpMediaProxy.select(id);
});

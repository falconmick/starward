import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpMenuProxy = createWordpressGraphqlProxy('wp-api-menus/v2/menu-locations');

export const getMenuItem = cacheResolver('getMedia')((parent, args) => {
  const { slug } = args || {};
  return wpMenuProxy.select(slug);
});

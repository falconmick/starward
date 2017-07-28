import { createWordpressGraphqlProxy } from '../utils/queryTools';

const wpMenuProxy = createWordpressGraphqlProxy('wp-api-menus/v2/menu-locations');

export default (parent, args) => {
  const { slug } = args || {};
  return wpMenuProxy.select(slug);
};
import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpCategoryProxy = createWordpressGraphqlProxy('wp/v2/categories');

export const getCategories = cacheResolver('getCategories')((obj, args) => {
  const { listOfIds } = args;
  return wpCategoryProxy.selectWithIdList(listOfIds);
});

export const getCategory = cacheResolver('getCategory')((obj, args) => {
  const { id } = args;
  return wpCategoryProxy.select(id);
});

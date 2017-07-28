import { createWordpressGraphqlProxy } from '../utils/queryTools';

const wpCategoryProxy = createWordpressGraphqlProxy('wp/v2/categories');

export const getCategories = (obj, args) => {
  const { listOfIds } = args;
  return wpCategoryProxy.selectWithIdList(listOfIds);
};

export const getCategory = (obj, args) => {
  const { id } = args;
  return wpCategoryProxy.select(id);
};

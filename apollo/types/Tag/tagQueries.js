import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpTagsProxy = createWordpressGraphqlProxy('wp/v2/tags');

export const getTags = cacheResolver('getTags')((obj, args) => {
  const { listOfIds } = args;
  return wpTagsProxy.selectWithIdList(listOfIds);
});

export const getTag = cacheResolver('getTag')((obj, args) => {
  const { id } = args;
  return wpTagsProxy.select(id);
});

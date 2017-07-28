import { createWordpressGraphqlProxy } from '../utils/queryTools';

const wpTagsProxy = createWordpressGraphqlProxy('wp/v2/tags');

export const getTags = (obj, args) => {
  const { listOfIds } = args;
  return wpTagsProxy.selectWithIdList(listOfIds);
};

export const getTag = (obj, args) => {
  const { id } = args;
  return wpTagsProxy.select(id);
};

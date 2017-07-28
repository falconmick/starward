import { createWordpressGraphqlProxy } from '../utils/queryTools';

const wpUserProxy = createWordpressGraphqlProxy('wp/v2/users');

export const getUsers = () => {
  return wpUserProxy.selectAll();
};

export const getUser = (obj, { id }) => {
  return wpUserProxy.select(id);
};

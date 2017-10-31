import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpUserProxy = createWordpressGraphqlProxy('wp/v2/users');

export const getUsers = cacheResolver('getUsers')(() => {
  return wpUserProxy.selectAll();
});

export const getUser = cacheResolver('getUser')((obj, { id }) => {
  return wpUserProxy.select(id);
});

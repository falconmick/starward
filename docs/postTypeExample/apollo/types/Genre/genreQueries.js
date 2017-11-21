import { createWordpressGraphqlProxy } from '../../utils/queryTools';
import { cacheResolver } from '../../utils/redis';

const wpGenreProxy = createWordpressGraphqlProxy('wp/v2/genre');

export const getGenres = cacheResolver('getGenres')((obj, args) => {
  const { listOfIds } = args;
  return wpGenreProxy.selectWithIdList(listOfIds);
});

export const getGenre = cacheResolver('getGenre')((obj, args) => {
  const { id } = args;
  return wpGenreProxy.select(id);
});

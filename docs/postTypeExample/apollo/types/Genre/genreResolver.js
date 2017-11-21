import { getGenres, getGenre } from './genreQueries';
import { resolveDashCase } from '../../utils/resolverTools';

export const resolvers = {
  RootQuery: {
    genres: getGenres,
    genre: getGenre
  },
  Genre: {
    yoast: ({yoast}) => {
      return resolveDashCase(yoast);
    },
  }
};

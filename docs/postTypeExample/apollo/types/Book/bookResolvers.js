import { getBook, getBooks } from './bookQueries';
import { basePostTypeResolvers } from '../../utils/postTypeResolver';
import { getGenres } from '../Genre/genreQueries';

export const resolvers = {
  RootQuery: {
    book: getBook,
    books: getBooks
  },
  Book: {
    genres: ({genre}) => {
      if (!genre || genre.length < 1) {
        return [];
      }
      return getGenres(null, {listOfIds: genre});
    },
    ...basePostTypeResolvers
  },
};

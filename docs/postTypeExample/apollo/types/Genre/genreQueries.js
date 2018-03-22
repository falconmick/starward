import { taxonomyQueryFactory } from '../../../../../apollo/utils/taxonomyQueryFactory';

const { getTaxonomies, getTaxonomy } = taxonomyQueryFactory({apiEndpoint: 'genre'});

export const getGenres = getTaxonomies;

export const getGenre = getTaxonomy;
import { taxonomyQueryFactory } from '../../utils/taxonomyQueryFactory';

const { getTaxonomies, getTaxonomy } = taxonomyQueryFactory({apiEndpoint: 'categories'});

export const getCategories = getTaxonomies;
export const getCategory = getTaxonomy;

import { postQueryFactory } from '../../utils/postQueryFactory';
import {
  authorResolvers, basePostTypeResolvers, excerptResolvers,
  featuredMediaResolvers
} from '../../utils/postTypeResolver';

const reduceTaxonomyResolvers = (accumulator, tax) => {
  const { archiveTaxonomyQueryName, archiveResolver } = tax;
  accumulator[archiveTaxonomyQueryName] = archiveResolver;
  return accumulator;
};

export const createResolver = ({typeName, singleQueryName, archiveQueryName, typeNameCamelCase, apiEndpoint, taxonomies}) => {
  // const { taxonomyType, archiveTaxonomyQueryName, archiveResolver } = [taxonomies];
  const { getPost, getPosts } = postQueryFactory({typeNameCamelCase, apiEndpoint});

  const typeResolver = {
    // categories: ({categories}) => {
    //   return getCategories(null, {listOfIds: categories});
    // },
    // tags: ({tags}) => {
    //   return getTags(null, {listOfIds: tags});
    // },
    ...authorResolvers,
    ...featuredMediaResolvers,
    ...excerptResolvers,
    ...basePostTypeResolvers,
  };
  const typeResolverWithTaxonomies = taxonomies.reduce(reduceTaxonomyResolvers, typeResolver);

  return {
    RootQuery: {
      [singleQueryName]: getPost,
      [archiveQueryName]: getPosts
    },
    [typeName]: typeResolverWithTaxonomies,
  };
};

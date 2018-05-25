import { resolveDashCase } from '../../utils/resolverTools';

export const createResolver = ({typeName, singleQueryName, archiveQueryName, getTaxonomies, getTaxonomy}) => {
  return {
    RootQuery: {
      [archiveQueryName]: getTaxonomies,
      [singleQueryName]: getTaxonomy
    },
    [typeName]: {
      yoast: ({yoast}) => {
        return resolveDashCase(yoast);
      },
    }
  };
};

export const extendTaxonomyOntoPostTypeResolver = ({extendingTypeName: postTypeTypeName, taxonomyFieldName, getTaxonomies}) => {
  return {
    [postTypeTypeName]: {
      [taxonomyFieldName]: getTaxonomies,
    },
  };
};

export const extendPostTypeOntoTaxonomyResolver = ({taxonomyTypeName, postTypeFieldName, taxonomyCamelCase, getPosts}) => {
  return {
    [taxonomyTypeName]: {
      [postTypeFieldName]: getPosts({taxonomyField: taxonomyCamelCase}),
    },
  };
};

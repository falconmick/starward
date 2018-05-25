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

export const extendArchiveResolver = ({extendingTypeName, taxonomyFieldName, getTaxonomies}) => {
  return {
    [extendingTypeName]: {
      [taxonomyFieldName]: getTaxonomies,
    },
  };
};

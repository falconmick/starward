import { taxonomyQueryFactory } from '../../utils/taxonomyQueryFactory';
import { resolveDashCase } from '../../utils/resolverTools';

export const createResolver = ({typeName, singleQueryName, archiveQueryName, typeNameCamelCase, apiEndpoint}) => {
  const { getTaxonomies, getTaxonomy } = taxonomyQueryFactory({typeNameCamelCase, apiEndpoint});

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
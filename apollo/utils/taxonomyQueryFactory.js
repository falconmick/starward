import { createWordpressGraphqlProxy } from './queryTools';
import { cacheResolver } from './redis';

// given a paren obj and args passed to this filed:
// try to extract listOfIds from args, if so this trumps the args passed down by the parent object (manual override)
// if args doesn't contain listOfIds, fallback to the parents obj ID list
const resolveListOfIds = ({typeNameCamelCase}) => (obj, args) => {
  const { listOfIds: listOfIdsFromArgs } = args;
  const listOfIdsFromObj = obj ? obj[typeNameCamelCase] : null;

  const listOfIds = listOfIdsFromArgs || listOfIdsFromObj;
  return { listOfIds };
};

export const taxonomyQueryFactory = ({typeNameCamelCase, apiEndpoint}) => {
  const typeNameCamelCasePlural = typeNameCamelCase + 's';
  const wpApiLocation = `wp/v2/${apiEndpoint || typeNameCamelCasePlural}`;

  const wpTaxonomyProxy = createWordpressGraphqlProxy(wpApiLocation);

  // cache resolver is a curry where you pass settings first and if the cache misses, it runs the (obj, args.. part
  const _getTaxonomies = cacheResolver(`${wpApiLocation}-archive`, {
    additionalArgsMapper: resolveListOfIds({typeNameCamelCase})
  })((obj, args, additionalArgs) => {
    const { listOfIds } = additionalArgs;

    // if we have a list of id's and it's empty, this means that we are searching
    // for nothing so we should get nothing.. if it's undefined it means that we are
    // being
    if (listOfIds && listOfIds.length === 0) {
      return [];
    }
    return wpTaxonomyProxy.selectWithIdList(listOfIds);
  });

  const _getTaxonomy = cacheResolver(`${wpApiLocation}-single`)((obj, args) => {
    const { id } = args;
    return wpTaxonomyProxy.select(id);
  });

  return {
    getTaxonomy: _getTaxonomy,
    getTaxonomies: _getTaxonomies,
  };
};

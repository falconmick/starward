import { createWordpressGraphqlProxy } from './queryTools';
import { cacheResolver } from './redis';

export const taxonomyQueryFactory = ({typeNameCamelCase, apiEndpoint}) => {
  const typeNameCamelCasePlural = typeNameCamelCase + 's';
  const wpApiLocation = `wp/v2/${apiEndpoint || typeNameCamelCasePlural}`;

  const wpCategoryProxy = createWordpressGraphqlProxy(wpApiLocation);

  const _getTaxonomies = cacheResolver(`${wpApiLocation}-archive`)((obj, args) => {
    const { listOfIds } = args;
    const listOfIdsFromObj = obj ? obj[typeNameCamelCase] : null;

    const listOfIdsToUse = listOfIds || listOfIdsFromObj;
    // if we have a list of id's and it's empty, this means that we are searching
    // for nothing so we should get nothing.. if it's undefined it means that we are
    // being
    if (listOfIdsToUse && listOfIdsToUse.length === 0) {
      return [];
    }
    return wpCategoryProxy.selectWithIdList(listOfIdsToUse);
  });

  const _getTaxonomy = cacheResolver(`${wpApiLocation}-single`)((obj, args) => {
    const { id } = args;
    return wpCategoryProxy.select(id);
  });

  return {
    getTaxonomy: _getTaxonomy,
    getTaxonomies: _getTaxonomies,
  };
};

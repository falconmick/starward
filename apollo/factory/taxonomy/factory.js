import { merge } from 'lodash';
import { apolloBundle } from '../../utils/apolloBundle';
import { createType, extendTaxonomyOntoPostTypeType, extendPostTypeOntoTaxonomyType } from './createTaxonomyType';
import { createResolver, extendTaxonomyOntoPostTypeResolver, extendPostTypeOntoTaxonomyResolver } from './createTaxonomyResolver';
import { taxonomyQueryFactory } from '../../utils/taxonomyQueryFactory';
import Taxonomy from '../../interface/taxonomy';

const taxonomyExtenderFactory =
  ({typeName: taxonomyTypeName, archiveQueryName, getTaxonomies, typeNameCamelCase: taxonomyCamelCase}) =>
    ({typeName: extendingTypeName, archiveQueryName: postTypeArchiveQueryName, getPosts}) => {
  const _addTaxonomyToPostType = ({taxonomyFieldName = archiveQueryName}) => {
    const rawType = extendTaxonomyOntoPostTypeType({taxonomyFieldName, taxonomyTypeName, extendingTypeName});
    const resolvers = extendTaxonomyOntoPostTypeResolver({extendingTypeName, taxonomyFieldName, getTaxonomies});

    return {
      rawType,
      resolvers,
    };
  };

  const _addTaxonomyToPostTypeBundle = ({taxonomyFieldName} = {}) => {
    const { rawType, resolvers } = _addTaxonomyToPostType({taxonomyFieldName});

    const type = () => [rawType];

    return apolloBundle({type, resolvers});
  };

  const _addPostTypeToTaxonomy = ({postTypeFieldName = postTypeArchiveQueryName}) => {
    const rawType = extendPostTypeOntoTaxonomyType({taxonomyTypeName, postTypeFieldName, extendingTypeName});
    const resolvers = extendPostTypeOntoTaxonomyResolver({taxonomyTypeName, postTypeFieldName, taxonomyCamelCase, getPosts});

    return {
      rawType,
      resolvers,
    };
  };

  const _addPostTypeToTaxonomyBundle = ({postTypeFieldName}) => {
    const { rawType, resolvers } = _addPostTypeToTaxonomy({postTypeFieldName});

    const type = () => [rawType];

    return apolloBundle({type, resolvers});
  };

  // args passed are optional (if your feild names don't follow convention you'll need
  // to re-name them here so we can find them on the API response
  const _twoWayBindPostTypeToTaxonomy = ({postTypeFieldName, taxonomyFieldName} = {}) => {
    const { rawType: typeA, resolvers: resolverA } = _addTaxonomyToPostType({taxonomyFieldName});
    const { rawType: typeB, resolvers: resolverB } = _addPostTypeToTaxonomy({postTypeFieldName, taxonomyCamelCase});

    const type = () => [typeA, typeB];
    const resolvers = merge(resolverA, resolverB);

    return apolloBundle({type, resolvers});
  };

  return {
    addTaxonomyToPostType: _addTaxonomyToPostTypeBundle,
    addPostTypeToTaxonomy: _addPostTypeToTaxonomyBundle,
    twoWayBindPostTypeToTaxonomy: _twoWayBindPostTypeToTaxonomy,
  };
};

export const taxonomyFactory = ({typeName, queryName, apiEndpoint}) => {
  const { single, archive } = queryName || {};
  const typeNameCamelCase = typeName[0].toLowerCase() + typeName.slice(1);
  const singleQueryName = single || typeNameCamelCase;
  const archiveQueryName = archive || singleQueryName + 's';

  // create the taxonomy GraphQL Type
  const taxonomyTypeString = createType({typeName, singleQueryName, archiveQueryName});
  const type = () => [taxonomyTypeString, Taxonomy];

  // create the post and archive resolvers
  const { getTaxonomies, getTaxonomy } = taxonomyQueryFactory({typeNameCamelCase, apiEndpoint});
  const resolvers = createResolver({typeName, singleQueryName, archiveQueryName, getTaxonomies, getTaxonomy});

  // bundle the type and resolver
  const bundle = apolloBundle({type, resolvers});

  return {
    bundle,
    taxonomyExtender: taxonomyExtenderFactory({typeName, archiveQueryName, getTaxonomies, typeNameCamelCase}),
  };
};

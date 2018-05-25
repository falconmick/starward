import { merge } from 'lodash';
import { apolloBundle } from '../../utils/apolloBundle';
import { createType, extendSingleType, extendArchiveType } from './createTaxonomyType';
import { createResolver, extendSingleResolver, extendArchiveResolver } from './createTaxonomyResolver';
import { taxonomyQueryFactory } from '../../utils/taxonomyQueryFactory';

const taxonomyExtenderFactory =
  ({typeName: taxonomyTypeName, singleQueryName, archiveQueryName, getTaxonomies, getTaxonomy}) =>
    ({typeName: extendingTypeName}) => {
  const _single = ({taxonomyFieldName}) => {
    const rawType = extendSingleType({taxonomyFieldName, taxonomyTypeName, extendingTypeName});
    const resolvers = extendSingleResolver({extendingTypeName, taxonomyFieldName, getTaxonomy});

    return {
      rawType,
      resolvers,
    };
  };

  const _singleBundle = ({taxonomyFieldName = singleQueryName} = {}) => {
    const { rawType, resolvers } = _single({taxonomyFieldName});

    const type = () => [rawType];

    return apolloBundle({type, resolvers});
  };

  const _archive = ({taxonomyFieldName}) => {
    const rawType = extendArchiveType({taxonomyFieldName, taxonomyTypeName, extendingTypeName});
    const resolvers = extendArchiveResolver({extendingTypeName, taxonomyFieldName, getTaxonomies});

    return {
      rawType,
      resolvers,
    };
  };

  const _archiveBundle = ({taxonomyFieldName = archiveQueryName} = {}) => {
    const { rawType, resolvers } = _archive({taxonomyFieldName});

    const type = () => [rawType];

    return apolloBundle({type, resolvers});
  };

  const _both = ({taxonomySingleFieldName = archiveQueryName, taxonomyArchiveFieldName = singleQueryName} = {}) => {
    const { rawType: rawSingleType, resolvers: singleResolvers } = _single({taxonomyFieldName: taxonomySingleFieldName});
    const { rawType: rawArchiveType, resolvers: archiveResolvers } = _archive({taxonomyFieldName: taxonomyArchiveFieldName});

    const type = () => [rawSingleType, rawArchiveType];
    const resolvers = merge(singleResolvers, archiveResolvers);

    return apolloBundle({type, resolvers});
  };

  return {
    single: _singleBundle,
    archive: _archiveBundle,
    both: _both,
  };
};

export const taxonomyFactory = ({typeName, queryName, apiEndpoint}) => {
  const { single, archive } = queryName || {};
  const typeNameCamelCase = typeName[0].toLowerCase() + typeName.slice(1);
  const singleQueryName = single || typeNameCamelCase;
  const archiveQueryName = archive || singleQueryName + 's';

  // create the taxonomy GraphQL Type
  const taxonomyTypeString = createType({typeName, singleQueryName, archiveQueryName});
  const type = () => [taxonomyTypeString];

  // create the post and archive resolvers
  const { getTaxonomies, getTaxonomy } = taxonomyQueryFactory({typeNameCamelCase, apiEndpoint});
  const resolvers = createResolver({typeName, singleQueryName, archiveQueryName, getTaxonomies, getTaxonomy});

  // bundle the type and resolver
  const bundle = apolloBundle({type, resolvers});

  return {
    bundle,
    taxonomyExtender: taxonomyExtenderFactory({typeName, singleQueryName, archiveQueryName, getTaxonomies, getTaxonomy}),
  };
};

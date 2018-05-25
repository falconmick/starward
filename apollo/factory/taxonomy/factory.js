import { apolloBundle } from '../../utils/apolloBundle';
import { createType, extendArchiveType } from './createTaxonomyType';
import { createResolver, extendArchiveResolver } from './createTaxonomyResolver';
import { taxonomyQueryFactory } from '../../utils/taxonomyQueryFactory';

const taxonomyExtenderFactory =
  ({typeName: taxonomyTypeName, archiveQueryName, getTaxonomies}) =>
    ({typeName: extendingTypeName}) => {
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

  return {
    archive: _archiveBundle,
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
    taxonomyExtender: taxonomyExtenderFactory({typeName, archiveQueryName, getTaxonomies}),
  };
};

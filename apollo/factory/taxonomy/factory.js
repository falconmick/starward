import { apolloBundle } from '../../utils/apolloBundle';
import { createType } from './createTaxonomyType';
import { createResolver } from './createTaxonomyResolver';
import { createRootQuery } from './createTaxonomyRootQuery';

export const taxonomyFactory = ({typeName, queryName, apiEndpoint}) => {
  const { single, archive } = queryName || {};
  const typeNameCamelCase = typeName[0].toLowerCase() + typeName.slice(1);
  const singleQueryName = single || typeNameCamelCase;
  const archiveQueryName = archive || singleQueryName + 's';

  // create the taxonomy GraphQL Type
  const taxonomyTypeString = createType({typeName});
  const type = () => [taxonomyTypeString];

  // create the post and archive resolvers
  const resolvers = createResolver({typeName, singleQueryName, archiveQueryName, typeNameCamelCase, apiEndpoint});

  // generate the string for the Root Query
  const rootQuery = createRootQuery({archiveQueryName, singleQueryName, typeName});

  // bundle the type and resolver
  const bundle = apolloBundle({type, resolvers});

  // pass this to the post type factory to add taxonomy
  const addToPostTypeArgs = {
    taxonomyType: type,
    taxonomyTypeName: typeName,
    archiveTaxonomyQueryName: archiveQueryName,
    archiveResolver: resolvers.RootQuery[archiveQueryName],
  };

  return {
    bundle,
    rootQuery,
    addToPostTypeArgs,
  };
};

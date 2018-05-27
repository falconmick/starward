import { buildFlexibleContentUnion } from './FlexibleContentUnion';
import { apolloBundle } from '../../../apollo/utils/apolloBundle';
import { apolloModule } from '../../../apollo/utils/apolloModule';
import * as acfGraphQLObject from '../../components/Acf/Layout/graphql';

const acfGraphQL = Object.entries(acfGraphQLObject).map(([key, value]) => value);
const acfGraphQlBundles = acfGraphQL.map(({type, resolvers}) => apolloBundle({type, resolvers}));
const flexibleContentUnionValues = acfGraphQL.map(({typeName}) => typeName);
const { resolvers, type } = buildFlexibleContentUnion({flexibleContentUnionValues});
const flexibleContentUnionBundle = apolloBundle({resolvers, type});

// flexibleContentUnionBundle must be passed in first as acfGraphQlBundles depends on it.
// order probably doesn't matter as I think that the graphQL type bundler hoists, but I'm
// not 100% sure
export const layoutModules = apolloModule(flexibleContentUnionBundle, ...acfGraphQlBundles);

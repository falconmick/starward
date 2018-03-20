import { flexibleContentBundles } from '../components/Acf/Layout';
import FlexibleContentUnion, { resolvers as flexibleContentUnionResolvers } from '../components/Acf/FlexibleContentUnion';
import { apolloBundle } from '../../apollo/utils/apolloBundle';
import { apolloModule } from '../../apollo/utils/apolloModule';

// the following is used to bundle the Acf Latout Types, their resolvers and the FlexibleContentUnion
const flexibleContentUnionBundle = apolloBundle({type: FlexibleContentUnion, resolvers: flexibleContentUnionResolvers});

// pass nothing to curried part (after bundles) because we are not defining any new queries or mutations
export const layoutModules = apolloModule(flexibleContentUnionBundle, ...flexibleContentBundles)();
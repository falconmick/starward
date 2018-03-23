import FlexibleContentUnion, { resolvers as flexibleContentUnionResolvers } from './FlexibleContentUnion';
import { formSectionResolvers, FormSectionType } from './queryables/FormSection';
import { apolloBundle } from '../../../apollo/utils/apolloBundle';
import { apolloModule } from '../../../apollo/utils/apolloModule';


const formSectioBundle = apolloBundle({type: FormSectionType, resolvers: formSectionResolvers});

// the following is used to bundle the Acf Latout Types, their resolvers and the FlexibleContentUnion
const flexibleContentUnionBundle = apolloBundle({type: FlexibleContentUnion, resolvers: flexibleContentUnionResolvers});

// pass nothing to curried part (after bundles) because we are not defining any new queries or mutations
export const layoutModules = apolloModule(flexibleContentUnionBundle, formSectioBundle)();

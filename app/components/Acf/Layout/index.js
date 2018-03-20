import { apolloBundle } from '../../../../apollo/utils/apolloBundle';
import { FormSectionType, formSectionResolvers } from './FormSection';

const formSectioBundle = apolloBundle({type: FormSectionType, resolvers: formSectionResolvers});

export const flexibleContentBundles = [formSectioBundle];

export {IntroSection} from './IntroSection';
export {Services} from './Services';
export { FormSection } from './FormSection';
export {FormSection as FormSectionUncached} from './FormSection/FormSection';

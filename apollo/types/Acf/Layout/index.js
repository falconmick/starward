import { merge } from 'lodash';
import FormSection, { resolvers as formSectionResolvers } from './FormSection';
import { resolvers as unionResolver } from './flexibleContentUnionResolvers';

const FlexibleContentUnion = `
type EmptyType {
thisisnotused: String
}
union FlexibleContentUnion = FormSection | EmptyType
`;

export default () => [FlexibleContentUnion, FormSection];
export const resolvers = merge(unionResolver, formSectionResolvers);

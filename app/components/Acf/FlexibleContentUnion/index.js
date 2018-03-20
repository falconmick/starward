import { merge } from 'lodash';

// EmptyType is a fallback for if the developer hasn't created
// a custom ACF Layout resolver
const FlexibleContentUnion = `
type EmptyType {
thisisnotused: String
}
union FlexibleContentUnion = FormSection | EmptyType
`;

export default () => [FlexibleContentUnion];
export { resolvers } from './flexibleContentUnionResolvers';

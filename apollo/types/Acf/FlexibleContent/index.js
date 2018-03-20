import { merge } from 'lodash';


const FlexibleContent = `
type FlexibleContent {
  autoFields: RawJson
  queryable: FlexibleContentUnion
}
`;

export default () => [FlexibleContent];
export { resolvers } from './flexibleContentResolvers';

import { merge } from 'lodash';
import FlexibleContentUnion, { resolvers as layoutResolvers } from '../Layout';
import { resolvers as flexibleContentResolver } from './flexibleContentResolvers';


const FlexibleContent = `
type FlexibleContent {
  autoFields: RawJson
  queryable: FlexibleContentUnion
}
`;

export default () => [FlexibleContent, FlexibleContentUnion];
export const resolvers = merge(layoutResolvers, flexibleContentResolver);

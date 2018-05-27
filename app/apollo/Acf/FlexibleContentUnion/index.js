import { createResolvers } from './flexibleContentUnionResolvers';

export const buildFlexibleContentUnion = ({flexibleContentUnionValues}) => {
  const FlexibleContentUnion = `
  type EmptyType {
    isEmptyType: Boolean
  }
  union FlexibleContentUnion = ${[...flexibleContentUnionValues, 'EmptyType'].join(' | ')}
  `;

  const type = () => [FlexibleContentUnion];
  const resolvers = createResolvers(flexibleContentUnionValues);

  return {
    type,
    resolvers,
  };
};

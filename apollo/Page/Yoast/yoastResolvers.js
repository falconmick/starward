import { GraphQLString } from 'graphql';

export const resolvers = {
  MetaRobotsNoIndex: {
    type: GraphQLString,
    resolve: (yoast) => {
      // get the value `xlarge` from the passed mongoose object 'imageFormats'
      const metaRobotsNoIndex = yoast['meta-robots-noindex'];
      return metaRobotsNoIndex;
    },
  },
};

import query from './pageQueries';
import { resolveDashCase } from '../utils/resolverTools';

export const resolvers = {
  RootQuery: {
    page: query,
  },
  Page: {
    yoast: ({yoast}) => {
      return resolveDashCase(yoast);
    },
    content: ({content}) => {
      return content.rendered;
    }
  }
};

import { pageQuery, pageSearchQuery } from './pageQueries';
import { resolveDashCase } from '../utils/resolverTools';

export const resolvers = {
  RootQuery: {
    page: pageQuery,
    pages: pageSearchQuery,
  },
  Page: {
    yoast: ({yoast}) => {
      return resolveDashCase(yoast);
    },
    content: ({content}) => {
      return content.rendered;
    },
    title: ({title}) => {
      return title.rendered;
    },
  }
};

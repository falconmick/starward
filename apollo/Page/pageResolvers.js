import moment from 'moment';
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
    created: ({date_gmt}) => {
      const asMoment = moment.utc(date_gmt);
      return asMoment.toISOString();
    },
    modified: ({modified_gmt}) => {
      const asMoment = moment.utc(modified_gmt);
      return asMoment.toISOString();
    },
  }
};

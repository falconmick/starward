import moment from 'moment';
import { getMedia } from './mediaQueries';

export const resolvers = {
  RootQuery: {
    media: getMedia,
  },
  Media: {
    url: ({guid}) => {
      return guid && guid.rendered ? guid.rendered : '';
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

import moment from 'moment';
import { getMedia } from './mediaQueries';
import { extractRendered } from '../../utils/resolverTools';

export const resolvers = {
  RootQuery: {
    media: getMedia,
  },
  Media: {
    url: ({guid}) => {
      return extractRendered(guid);
    },
    created: ({date_gmt}) => {
      const asMoment = moment.utc(date_gmt);
      return asMoment.toISOString();
    },
    modified: ({modified_gmt}) => {
      const asMoment = moment.utc(modified_gmt);
      return asMoment.toISOString();
    },
    guid: ({guid}) => {
      return extractRendered(guid);
    },
    title: ({title}) => {
      return extractRendered(title);
    },
    caption: ({caption}) => {
      return extractRendered(caption);
    },
  }
};

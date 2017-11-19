import moment from 'moment';
import { extractRendered, resolveDashCase } from './resolverTools';
import { getMedia } from '../types/Media/mediaQueries';
import { getUser } from '../types/User/userQueries';

export const basePostTypeResolvers = {
  yoast: ({yoast}) => {
    return resolveDashCase(yoast);
  },
  title: ({title}) => {
    return title.rendered;
  },
  content: ({content}) => {
    return content.rendered;
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
  }
};

export const excerptResolvers = {
  excerpt: ({excerpt}) => {
    return excerpt.rendered;
  }
};

export const featuredMediaResolvers = {
  featured_media: ({featured_media: featuredMedia}) => {
    if (!featuredMedia || featuredMedia === 0) {
      return null;
    }
    return getMedia(null, {id: featuredMedia});
  }
};

export const authorResolvers = {
  author: ({author}) => {
    return getUser(null, {id: author});
  }
};

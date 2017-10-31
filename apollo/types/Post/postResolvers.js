import moment from 'moment';
import { getPost, getPosts } from './postQueries';
import { getCategories } from '../Category/categoryQueries';
import { getUser } from '../User/userQueries';
import { getMedia } from '../Media/mediaQueries';
import { getTags } from '../Tag/tagQueries';
import { resolveDashCase } from '../../utils/resolverTools';

export const resolvers = {
  RootQuery: {
    post: getPost,
    posts: getPosts
  },
  Post: {
    categories: ({categories}) => {
      return getCategories(null, {listOfIds: categories});
    },
    author: ({author}) => {
      return getUser(null, {id: author});
    },
    featured_media: ({featured_media}) => {
      if (!featured_media || featured_media === 0) {
        return null;
      }
      return getMedia(null, {id: featured_media});
    },
    yoast: ({yoast}) => {
      return resolveDashCase(yoast);
    },
    tags: ({tags}) => {
      return getTags(null, {listOfIds: tags});
    },
    title: ({title}) => {
      return title.rendered;
    },
    excerpt: ({excerpt}) => {
      return excerpt.rendered;
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
    }
  },
};

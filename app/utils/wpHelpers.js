import { WP_URL } from '../config/app';
/* Render title in hypen joined, lowercase string */

/* Get slug from Wordpress URL */
export const getSlug = (url) => {
  if (url === '#') {
    return '#';
  } else if (url.indexOf(WP_URL) !== -1) {
    return url.split(WP_URL)[1];
  }
  return url;
};

export const getClassFromTitle = (title) => {
  return title.split(' ').join('-').toLowerCase();
};

import axios from 'axios';
import { WP_API, WP_URL, HOME_SLUG } from '../../config/app';
import { getSlug } from '../utils/queryTools';
import { camelCaseYoastObject } from '../Yoast/util';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPagesURL = `${WP_API}/wp/v2/pages`;

/*
  Given an optional splat, will find the page with the matching url.
  this is done via getting all pages with the slug (last item inside
  of splay seperated via / and then we find the link which matches our
  splay from this result
 */
export default (obj, args) => {
  const { splat = '' } = args;
  // if we have no slug, it's home so we need to add the Home Slug
  const slug = getSlug(splat) || HOME_SLUG;
  // covert the splat into a full URL for matching (remove trailing /)
  const splatAsUrl = `${WP_URL}/${splat}`.replace(/\/$/, '');
  return new Promise((resolve, reject) => {
    const wpPageURL = `${wpPagesURL}?slug=${slug}`;
    return axios.get(wpPageURL)
      .then(res => {
        // the above query returns 0->many pages, so we need
        // to find the correct page via link matching
        const page = res.data.filter(slugPage => {
          const { link = '' } = slugPage;
          const linkWithoutSlash = link.replace(/\/$/, '');

          return linkWithoutSlash === splatAsUrl;
        })[0];
        if (page && page.yoast) {
          page.yoast = camelCaseYoastObject(page.yoast);
          resolve(page);
        } else {
          reject('page not found');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

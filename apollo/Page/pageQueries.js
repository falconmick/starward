import axios from 'axios';
import { WP_API, WP_URL } from '../../config/app';
import { getSlug } from '../utils/queryTools';
import { camelCaseYoastObject } from '../Yoast/util';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPagesURL = `${WP_API}/wp/v2/pages`;

export default (obj, args) => {
  const { splat = '' } = args;
  const slug = getSlug(splat) || 'home';
  const splatAsUrl = `${WP_URL}/${splat}`.replace(/\/$/, '');
  return new Promise((resolve, reject) => {
    const wpPageURL = `${wpPagesURL}?slug=${slug}`;
    return axios.get(wpPageURL)
      .then(res => {
        const page = res.data.filter(slugPage => {
          const { link = '' } = slugPage;
          const linkWithoutSlash = link.replace(/\/$/, '');

          return linkWithoutSlash === splatAsUrl;
        })[0];
        if (page && page.yoast) {
          page.yoast = camelCaseYoastObject(page.yoast);
          resolve(page);
        } else {
          reject('page or yoast null');
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

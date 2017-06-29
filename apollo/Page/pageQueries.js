import axios from 'axios';
import { WP_API } from '../../config/app';
import { dashCaseToCamelCase } from '../utils/queryTools';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPagesURL = `${WP_API}/wp/v2/pages`;

export default (obj, args) => {
  const { slug } = args;
  return new Promise((resolve, reject) => {
    const wpPageURL = `${wpPagesURL}?slug=${slug}`;
    return axios.get(wpPageURL)
      .then(res => {
        const page = res.data[0];
        if(page && page.yoast) {
          const graphQlYoast = Object.keys(page.yoast)
            .reduce((accumulator, key) => {
              const safeKey = dashCaseToCamelCase(key);
              // creating a new object each time probably isnt smart
              // return {[safeKey]: page.yoast[key], ...accumulator};
              // eslint-disable-next-line no-param-reassign
              accumulator[safeKey] = page.yoast[key];
              return accumulator;
            }, {});
          page.yoast = graphQlYoast;
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

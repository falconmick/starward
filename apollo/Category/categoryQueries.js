import axios from 'axios';
import { camelCaseYoastObject } from '../Yoast/util';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMenuLocations = `${WP_API}/wp/v2/categories`;

export default () => {
  return new Promise((resolve, reject) => {
    axios.get(wpMenuLocations)
      .then(res => {
        const graphQlCategory = res.data.reduce((accumulator, category) => {
          if (category && category.yoast) {
            const { yoast, ...otherCategoryParts } = category;
            const graphQlYoast = camelCaseYoastObject(yoast);
            accumulator.push({yoast: graphQlYoast, ...otherCategoryParts});
          }
          return accumulator;
        }, []);

        resolve(graphQlCategory);
      })
      .catch(err => {
        reject(err);
      });
  });
};

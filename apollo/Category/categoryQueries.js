import axios from 'axios';
import { camelCaseYoastObject } from '../Yoast/util';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpCategories = `${WP_API}/wp/v2/categories`;

export const getCategories = (obj, args) => {
  const { listOfIds } = args;
  return new Promise((resolve, reject) => {
    const categoryUrl = listOfIds ? `${wpCategories}?include=${listOfIds.join(',')}` : wpCategories;
    axios.get(categoryUrl)
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

export const getCategory = (obj, args) => {
  const { id } = args;
  return new Promise((resolve, reject) => {
    const url = `${wpCategories}/${id}`
    axios.get(url)
      .then(res => {
        const category = res.data;
        if (category && category.yoast) {
          const { yoast, ...otherCategoryParts } = category;
          const graphQlYoast = camelCaseYoastObject(yoast);
          const safeCategory = {yoast: graphQlYoast, ...otherCategoryParts};
          resolve(safeCategory);
        } else {
          reject('category not found');
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

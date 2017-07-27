import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpCategories = `${WP_API}/wp/v2/categories`;

export const getCategories = (obj, args) => {
  const { listOfIds } = args;
  return new Promise((resolve, reject) => {
    const categoryUrl = listOfIds ? `${wpCategories}?include=${listOfIds.join(',')}` : wpCategories;
    axios.get(categoryUrl)
      .then(res => {
        const categories = res.data;
        resolve(categories);
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
        resolve(category);
      })
      .catch(err => {
        reject(err);
      });
  });
};

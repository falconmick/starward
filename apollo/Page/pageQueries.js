import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPagesURL = `${WP_API}/wp/v2/pages`;

export default (obj, args) => {
  const { slug } = args;
  return new Promise((resolve, reject) => {
    const wpPageURL = `${wpPagesURL}?slug=${slug}`;
    return axios.get(wpPageURL)
      .then(res => {
        const page = res.data[0];
        resolve(page);
      })
      .catch(error => {
        reject(error);
      });
  });
};


import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMenuURL = `${WP_API}/wp-api-menus/v2`;
const wpMenuLocations = `${wpMenuURL}/menu-locations`;

export default (parent, args) => {
  const { slug } = args || {};
  return new Promise((resolve, reject) => {
    axios.get(`${wpMenuLocations}/${slug}`)
      .then(res => {
        const menuItems = Object.keys(res.data)
          .map((k) => res.data[k]);
        resolve(menuItems);
      })
      .catch(err => {
        reject(err);
      });
  });
};
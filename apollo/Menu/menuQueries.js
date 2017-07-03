import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMenuURL = `${WP_API}/wp-api-menus/v2`;
const wpMenuLocations = `${wpMenuURL}/menu-locations`;

export const getListOfMenus = () => {
  return new Promise((resolve, reject) => {
    axios.get(wpMenuLocations)
      .then(res => {
        const menuLocations = Object.keys(res.data)
          .map((k) => res.data[k]);
        resolve(menuLocations);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getMenu = (obj, args) => {
  const { menuName } = args;
  return new Promise((resolve, reject) => {
    axios.get(`${wpMenuURL}/${menuName}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

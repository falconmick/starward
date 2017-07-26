import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpUserURL = `${WP_API}/wp/v2/users`;

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    return axios.get(wpUserURL)
      .then(res => {
        const users = res.data;
        resolve(users);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getUser = (obj, { id }) => {
  return new Promise((resolve, reject) => {
    const getUserUrl = `${wpUserURL}/${id}`;
    return axios.get(getUserUrl)
      .then(res => {
        const users = res.data;
        resolve(users);
      })
      .catch(error => {
        reject(error);
      });
  });
};

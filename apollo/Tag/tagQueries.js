import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpTagURL = `${WP_API}/wp/v2/tags`;

export const getTags = (obj, args) => {
  const { listOfIds } = args;
  return new Promise((resolve, reject) => {
    const tagyUrl = listOfIds ? `${wpTagURL}?include=${listOfIds.join(',')}` : wpTagURL;
    return axios.get(tagyUrl)
      .then(res => {
        const users = res.data;
        resolve(users);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getTag = (obj, args) => {
  const { id } = args;
  return new Promise((resolve, reject) => {
    const getUserUrl = `${wpTagURL}/${id}`;
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

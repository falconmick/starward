import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpMediaURL = `${WP_API}/wp/v2/media`;

export const getMedia = (obj, { id }) => {
  return new Promise((resolve, reject) => {
    const getUserUrl = `${wpMediaURL}/${id}`;
    return axios.get(getUserUrl)
      .then(res => {
        const media = res.data;
        resolve(media);
      })
      .catch(error => {
        reject(error);
      });
  });
};

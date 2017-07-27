import axios from 'axios';
import { WP_API } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPostsURL = `${WP_API}/wp/v2/posts`;

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    return axios.get(wpPostsURL)
      .then(res => {
        const posts = res.data;
        resolve(posts);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getPost = (obj, args) => {
  const { slug } = args;
  return new Promise((resolve, reject) => {
    const wpPostURL = `${wpPostsURL}?slug=${slug}`;
    return axios.get(wpPostURL)
      .then(res => {
        const post = res.data[0];
        resolve(post);
      })
      .catch(error => {
        reject(error);
      });
  });
};
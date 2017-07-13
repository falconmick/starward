import axios from 'axios';
import { WP_API } from '../../config/app';
import { camelCaseYoastObject } from '../Yoast/util';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPostsURL = `${WP_API}/wp/v2/posts`;

const makePostGraphQl = (post) => {
  const { yoast, ...otherProps } = post;
  let graphQlYoast = null;
  if (post && yoast) {
    graphQlYoast = camelCaseYoastObject(yoast);
  }
  return {yoast: graphQlYoast, ...otherProps};
};

export const getPosts = () => {
  return new Promise((resolve, reject) => {
    return axios.get(wpPostsURL)
      .then(res => {
        const posts = res.data;
        const graphQlPosts = posts.map(p => makePostGraphQl(p));
        resolve(graphQlPosts);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getPost = (obj, args) => {
  const { slug } = args;
  return new Promise((resolve, reject) => {
    const wpPageURL = `${wpPostsURL}?slug=${slug}`;
    return axios.get(wpPageURL)
      .then(res => {
        const post = res.data[0];
        const graphQlPost = makePostGraphQl(post);
        resolve(graphQlPost);
      })
      .catch(error => {
        reject(error);
      });
  });
};
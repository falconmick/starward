import { HOST, PORT, ENV } from './env';

// Wordpress
export const SITE_NAME = 'Starward';
export const WP_URL = 'http://localhost/starward_wp';
export const WP_API = `${WP_URL}/wp-json`;
export const WP_AUTH = new Buffer('root:root').toString('base64');
export const POSTS_PER_PAGE = 2;
export const HOME_SLUG = 'home';
export const BLOG_SLUG = 'blog';
export const CATEGORY_SLUG = 'category';
export const AUTHOR_SLUG = 'author';
export const SEARCH_SLUG = 'search';

// Starward
export const baseURL = `http://${HOST}:${PORT}`;

export const GRAPHQL_ENDPOINT = `${baseURL}/graphql`;

// Redis
export const REDIS_PREFIX = 'starward-'; // change me to your project name, for example: 'starward-'

// GraphQL
export const ROOT_API = `${baseURL}/api`;

// General
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';
export const serversideStateCharacterBlacklistRegex = /\u2028/g;

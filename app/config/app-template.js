import { HOST, PORT, ENV } from '../../env';

// Wordpress
export const SITE_NAME = 'Starward';
export const POSTS_PER_PAGE = 10;
export const HOME_SLUG = 'home';
export const BLOG_SLUG = 'blog';
export const CATEGORY_SLUG = 'category';
export const AUTHOR_SLUG = 'author';
export const SEARCH_SLUG = 'search';

// Starward
export const baseURL = `http://${HOST}:${PORT}`;
export const WP_URL = 'http://localhost/starward_wp';
export const WP_RESOURCE_URL = WP_URL; // change to '' and images will attempt to resolve to the app host, then if you have nginx setup you can proxy the WP through the APP hosting's address
//                                        This is useful when you proxy the /feed/ endpoint of WP and re-write all wp.somesite.com to somesite.com as the images also will get re-written, not just the links

// GraphQL
export const ROOT_API = `${baseURL}/api`;

// General
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

import { WP_URL as APP_WP_URL } from '../../app/config/app.js'

// Wordpress
export const WP_URL = APP_WP_URL;
export const WP_API = `${WP_URL}/wp-json`;
export const GRAVITY_PUBLIC = 'Add public key from gravity forms settings';
export const GRAVITY_PRIVATE = 'Add private key from gravity forms settings';

// Redis
export const REDIS_PREFIX = null; // change me to your project name, for example: 'starward-'

// General
export const serversideStateCharacterBlacklistRegex = /\u2028/g;

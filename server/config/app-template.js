// Wordpress
export const WP_URL = 'http://localhost/starward_wp';
export const WP_API = `${WP_URL}/wp-json`;
export const GRAVITY_PUBLIC = 'Add public key from gravity forms settings';
export const GRAVITY_PRIVATE = 'Add private key from gravity forms settings';
export const COOKIE_SIGNATURE = 'https://api.wordpress.org/secret-key/1.1/salt/'; // use me to make a salt
export const JWT_AUTH_SECRET_KEY = 'https://api.wordpress.org/secret-key/1.1/salt/'; // must match the secret used in WP

// Redis
export const REDIS_PREFIX = null; // change me to your project name, for example: 'starward-'

// General
export const serversideStateCharacterBlacklistRegex = /\u2028/g;

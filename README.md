# :boom: Starward

> Full-stack Wordpress boilerplate web app built using ReactJS and WP REST API v2, built on the awesome reactGo framework  :tada:

:construction: Still in construction, be delicate.

## Features:
- [**ReactJS**](https://facebook.github.io/react/)
- [**Universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) rendering :earth_asia:
- [**Redis**](https://redis.io/) page caching
- [**WP REST API v2**](http://v2.wp-api.org/)
- [**Redux**](https://github.com/reactjs/redux)
- [**React Router**](https://github.com/reactjs/react-router)
- [**React Router Redux**](https://github.com/reactjs/react-router-redux)
- [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) hot reloading
- [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack**](https://github.com/webpack/webpack)
- [**Express 4.x**](https://expressjs.com/en/api.html) server
- [**Apollo GraphQL**](http://apollodata.com)

## Wordpress Dependencies
Requires a Wordpress setup using the following plugins:
- [**WP Rest API**](https://en-au.wordpress.org/plugins/rest-api/)
- [**WP API Basic Auth**](https://github.com/WP-API/Basic-Auth)
- [**WP API Menus**](https://en-au.wordpress.org/plugins/wp-api-menus/)
- [**Better REST API Featured Images**](https://en-au.wordpress.org/plugins/better-rest-api-featured-images/)
- [**Yoast SEO**](https://yoast.com/wordpress/plugins/seo/)
- [**WP REST API Yoast SEO**](https://en-au.wordpress.org/plugins/wp-api-yoast-meta/)

**Strongly** recommended plugins
- [**ACF Pro**](https://www.advancedcustomfields.com/pro/)
- [**ACF to REST API**](https://en-au.wordpress.org/plugins/acf-to-rest-api/)

Optional supported plugins
- [**ACF**](https://www.advancedcustomfields.com/)
- [**Gravity Forms**](http://www.gravityforms.com/)
- [**Gravity Forms REST API v2**](https://www.gravityhelp.com/gravity-forms-rest-api-v2-beta-2-released/)

## Getting started

### Configuration
#### Client App Config
Rename `/app/config/app-template.js` to `/app/config/app.js`

- `SITE_NAME` fallback site name if ACF options page is unavailable
- `WP_URL` root URL of Wordpress installation
- `WP_API` root of WP API *(does not require changing from default)*
- `POSTS_PER_PAGE` number of posts to be shown on blog, category and author listing pages, default **10**
- `HOME_SLUG` WP slug for front page, default **homepage**
- `BLOG_SLUG` WP slug for posts page, default **blog**
- `CATEGORY_SLUG` desired root slug for category pages, default **category**
- `AUTHOR_SLUG` desired root slug for author pages, default **author**
- `baseURL` Starward hostname
- `ROOT_API` API endpoint for non GraphQL queries
- `GRAPHQL_ENDPOINT` All GraphQL queries are sent here


#### Server Config (contains secrets, don't include inside client/front end code)
Rename `/server/config/app-template.js` to `/server/config/app.js`
- `REDIS_PREFIX` Prefix for redis keys to avoid key clashes during development (required in production unless you disable redis via ENV variables)
- `GRAVITY_PUBLIC/GRAVITY_PRIVATE` keys used to sign all calls to Gravity Forms API, find these in Gravity Forms API settings (you must enable API)

### Redis Setup

Install redis (optional):

`brew install redis`

*(you can also [manually install](https://redis.io/topics/quickstart), but if you don't have brew it's rather useful!)*

Open a new terminal and run

`redis-server /usr/local/etc/redis.conf`

make sure to keep this terminal open as it's not running as a daemon. To see more ways of launching redis, check this [blog post](https://medium.com/@petehouston/install-and-config-redis-on-mac-os-x-via-homebrew-eb8df9a4f298) out.

### Quick and dirty ACF Pro Setup

Two ready to import [JSON field groups](https://support.advancedcustomfields.com/forums/topic/import-export-fields-groups/) are located here `/wp/ACF`:

- `page_flexible_content.json` - Component based (`/app/components/ACF/layout`) field group using the native ACF PRO flexible content field
- `settings_option_page.json` - Generic setting fields designed for a [custom option page](https://www.advancedcustomfields.com/resources/options-page/) within Wordpress and accessible from the GraphQL endpoint `/api/settings`

### Running Server
`yarn && yarn dev`

or using NPM

`npm install && npm run dev`

### Run with redis enabled (disabled in development by default)

Make sure that your redis client is running as described above, then:

`yarn && yarn dev-redis`

### Analysing package size

`yarn analyse`

### GraphQL Documentation:
- [Starward GraphQL Docs](docs/starward-graphql.md)
- [Extending GraphQL](docs/extending-graphql.md)
- [Adding Custom Post Types](docs/adding-custom-post-types.md)

### Styling

Sass partials are contained within `/public/assets/sass` and are split between four folders:

#### /base

Boilerplate partials including a reset, default typography rules, grid, print and reusable, per project mixins like *_omega-reset.scss*

#### /helpers

For storing mixins, functions and other Sass tools used across the project

#### /components

Adheres to the same name spacing as the app/components folder, each partial contains styling for the equivalent React component

#### /containers

Adheres to the same name spacing as the core app/containers folders, each partial contain the styling for the React Redux container that does not fit within an individual component partial. App.scss will contain app specific reusable and global styles.

#### /vendor

Contains Bourbon and Bourbon Neat and any other vendor specific styling

#### Get site settings from ACF PRO options page

Pulls data from a [custom option page](https://www.advancedcustomfields.com/resources/options-page/) containing the following ACF fields `/wp/ACF/settings_option_page.json`

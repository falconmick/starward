import moment from 'moment';
import { appSettings, gravityForms, wp } from '../../graphQL';
import { serversideStateCharacterBlacklistRegex, WP_URL, REDIS_PREFIX } from '../config/app';
import { createRedisClient } from '../redis';
import { submitForm } from './gravitySubmit';
import { loginUser } from '../wpJwt';
import { authenticateBearerUser } from './passport';
import {
  mustLoginMiddleware,
  mustLoginMiddlewareWhitelist
} from '../utility/auth';
import { LOGIN_FORM_ID, LOGIN_SLUG } from '../../app/config/app';

/* ----------- App API Helpers ----------- */
const client = createRedisClient(REDIS_PREFIX);

/* Removes illegal characters from WP API */
/* Checks for WP_URL in response and replaces it with the base url */
/* Reinstates correct wp-content links within response */
const sanitizeJSON = (json) => {
  const stringified = JSON.stringify(json);
  const wpUrlRegex = new RegExp(WP_URL, 'g');
  const wpContentUrlRegex = new RegExp('/wp-content', 'g');
  const cleaned = stringified
  .replace(serversideStateCharacterBlacklistRegex, '')
  .replace(wpUrlRegex, '')
  .replace(wpContentUrlRegex, `${WP_URL}/wp-content`);
  return JSON.parse(cleaned);
};
/* Handle success and sanitize JSON response */
const handleSuccess = (res) => {
  return (data) => {
    return res.json(sanitizeJSON(data));
  };
};
/* Handle error */
const handleError = (res) => {
  return (error) => {
    return res.json(error);
  };
};

const authenticationRequiredRoutesSetup = app => {
  // All api Routes after this have a requirement of being logged in
  // This is equivelant to adding mustLoginMiddleware before each route
  app.all('/api/*', mustLoginMiddleware());

  /* ENDPOINTS GO UNDER HERE */

  /* Get Collection of Posts */
  /* Expects query param ?page= */
  app.get('/api/posts', (req, res) => {
    wp(`
      query get_posts($page: Int, $perPage: Int) {
        posts(page: $page, perPage: $perPage) {
          items{
            slug,
            title,
            content,
            featuredImage{
              alt,
              url,
              sizes
            },
            acf,
            categories{
              name,
              slug
            },
            author{
              name,
              avatar
            }
          }
          categories{
            slug,
            name,
            parent,
            count
          }
          totalItems,
          totalPages
        }
      }`, {page: req.query.page, perPage: req.query.perPage})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });
  /* Get Individual Post */
  /* Expects query param ?slug= */
  app.get('/api/post', (req, res) => {
    wp(`
      query get_post($slug: String, $preview: Int) {
        activePost: post(slug: $slug, preview: $preview){
          slug,
          title,
          content,
          date,
          acf,
          link,
          pagination{
            next{
              slug,
              title,
              date,
              featuredImage{
                alt,
                url,
                sizes
              }
            },
            previous{
              slug,
              title,
              date,
              featuredImage{
                alt,
                url,
                sizes
              }
            },
          },
          featuredImage{
            alt,
            url,
            sizes
          },
          categories{
            name,
            slug
          },
          author{
            name,
            slug,
            avatar
          }
        }
      }`, {slug: req.query.slug, preview: req.query.preview})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });
  /* Get Category and Collection of Posts */
  /* Expects query param ?slug= && ?page= */
  app.get('/api/category', (req, res) => {
    wp(`
      query get_category($slug: String, $page: Int) {
        category(slug: $slug) {
          details{
            slug,
            name,
            description,
            id
          }
          posts(page: $page){
            items{
              slug,
              title,
              content,
              featuredImage{
                alt,
                url,
                sizes
              },
              acf,
              categories{
                name,
                slug
              },
              author{
                name,
                avatar
              }
            },
            totalItems,
            totalPages
          }
        }
      }`, {slug: req.query.slug, page: req.query.page})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });
  /* Get Author and Collection of Posts */
  /* Expects query param ?name && ?page= */
  app.get('/api/author', (req, res) => {
    wp(`
      query get_author($name: String, $page: Int) {
        author(name: $name) {
          details{
            slug,
            name,
            id
          }
          posts(page: $page){
            items{
              slug,
              title,
              content,
              featuredImage{
                alt,
                url,
                sizes
              },
              acf,
              categories{
                name,
                slug
              },
              author{
                name,
                avatar
              }
            },
            totalItems,
            totalPages
          }
        }
      }`, {name: req.query.name, page: req.query.page})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });
  /* Perform search and return results */
  /* Expects query param ?term= (OPTIONAL = ?type= && ?page= && ?perPage=) */
  app.get('/api/search', (req, res) => {
    wp(`
      query search($term: String, $type: String, $page: Int, $perPage: Int) {
        search(term: $term, type: $type, page: $page, perPage: $perPage) {
          items{
            slug,
            title,
            content,
            featuredImage{
              alt,
              url,
              sizes
            },
            acf,
            categories{
              name,
              slug
            },
            author{
              name,
              avatar
            }
          },
          totalItems,
          totalPages
        }
      }`, {term: req.query.term, type: req.query.type, page: req.query.page, perPage: req.query.perPage})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });
  /* ----------- Redis Endpoints ----------- */
  /* Flush Redis */
  app.get('/api/flushredis', (req, res) => {
    console.log(`${moment().format()} flushing Redis cache`);
    client.flushdb(err => {
      if (err) return res.json({error: err});
      return res.json({success: true});
    });
  });
};

const customAuthenticationRoutesSetup = app => {
  // login is excluded from the '/api/*' clause because the user can't login if it's not authorised to view this route
  app.post('/api/login', (req, res) => loginUser(req, res));

  /* Get Site Name and Description */
  /* Does not require a query param */
  /* allows anonymous access */
  app.get('/api/settings', (req, res) => {
    appSettings(`
      query{
        settings{
          name,
          emailAddress,
          phoneNumber,
          faxNumber,
          officeAddress,
          socialLinks,
          trackingType,
          trackingId,
          googleMapsApiKey,
          additionalScripts
        }
      }
    `)
      .then(handleSuccess(res))
      .catch(handleError(res));
  });

  /* Get Menu */
  /* Expects query param ?name= (?name=Header) */
  /* allows anonymous access */
  app.get('/api/menu', (req, res) => {
    appSettings(`
      query get_menu($name: String) {
        menu(name: $name) {
          title,
          url,
          order,
          classes,
          children{
            title,
            url,
            order,
            classes
          }
        }
      }`, {name: req.query.name})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });

  /* ----------- Wordpress API Routes ----------- */
  /* Get Page */
  /* Expects query param ?slug= */
  /* allows anonymous access to ONLY the login slug */
  const mustLoginPageMiddleware = mustLoginMiddlewareWhitelist({
    selector: (req) => req.query.slug,
    whitelist: [LOGIN_SLUG],
    realm: 'page',
  });
  app.get('/api/page', mustLoginPageMiddleware, (req, res) => {
    wp(`
      query get_page($slug: String, $preview: Int) {
        active_page: page(slug: $slug, preview: $preview) {
          title,
          content,
          slug,
          link,
          featuredImage{
            alt,
            url,
            sizes
          },
          acf,
          seo: yoast
        }
      }`, {slug: req.query.slug, preview: req.query.preview})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });
  /* ----------- Gravity Forms Endpoints ----------- */
  /* Get Gravity Form */
  /* Expects query param ?id= */
  /* allows anonymous access to ONLY the login form */
  const mustLoginFormMiddleware = mustLoginMiddlewareWhitelist({
    selector: (req) => +req.query.id,
    whitelist: [LOGIN_FORM_ID],
    realm: 'form',
  });
  app.get('/api/gravityforms', mustLoginFormMiddleware, (req, res) => {
    gravityForms(`
      query get_form($id: Int) {
        form(id: $id) {
          title,
          description,
          button,
          confirmation,
          fields{
            type,
            id,
            label,
            placeholder,
            classes: cssClass,
            required: isRequired,
            prePopulated,
            prePopulatedParam,
            choices,
            enablePasswordInput,
          }
        }
      }`, {id: req.query.id})
      .then(handleSuccess(res))
      .catch(handleError(res));
  });

  app.post('/api/gravityforms', mustLoginFormMiddleware, (req, res) => {
    return submitForm(req, res);
  });
};

/* ----------- App API Routes ----------- */
export default(app) => {
  // Some routes require Login status/user info, this extracts that from the Authorisation header
  // this middleware WILL NOT restrict access, rather it will allow restrictions to be made
  app.all('/api/*', authenticateBearerUser);
  customAuthenticationRoutesSetup(app);
  authenticationRequiredRoutesSetup(app);
};


// How to add per page/post Authorisation
//
// if you wish to make per-page Authorisation requirements, I would recomend that you
// create another acf field called authorisation in which you can let the page/post
// returning data also return any claim/authorisation requirements. the graphQLfunc that
// we currently have down here would need to use a modified handleSuccess that instead
// of calling res.json, saves the result to req.queryResult and then graphQlAuthorise
// would look for any authorisation requirements inside of req.queryResult, calling
// res.json(req.queryResult) if Authorisation didn't exist for page OR requirements were met
// and it would return a 403 if logged in, but not enough permisions or 401 (with WWW-Authenticate) if they're not logged
// in and they should!
//
// for example: app.get('/api/page', graphQLfunc, graphQlAuthorise);
//
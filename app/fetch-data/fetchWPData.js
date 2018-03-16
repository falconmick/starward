import axios from 'axios';
import { wpService } from './services';
import { SITE_NAME, HOME_SLUG, BLOG_SLUG, POSTS_PER_PAGE, LOGIN_SLUG } from '../config/app';


const handle404 = () => ({handle404: true});

const requestError = (err) => {
  console.log('err: ', err);
  throw err;
};

const fetchWPData = (params, routeName, location, axiosInstance = axios.create(), routeProps) => {
// GraphQL WP API Services using axios.get() https://github.com/mzabriskie/axios#example
  const {
    getSettings,
    getMenu,
    getPage,
    getPosts,
    getPost,
    getCategory,
    getAuthor,
    getSearchResults,
    getForm
  } = wpService(axiosInstance);
  // Switch statement on routeName from routes.jsx
  switch (routeName) {
    // App component data using axios.all() https://github.com/mzabriskie/axios#example
    // -- Fetching basic WP settings
    // -- Fetching menu for header component
    case 'App': {
      return axios.all([
        getSettings(),
        getMenu('primary_navigation')
      ])
      .then(([
        settings,
        headerMenu
      ]) => ({
        settings: !settings.data.data.settings ? { name: SITE_NAME } : settings.data.data.settings,
        headerMenu: headerMenu.data.data.menu
      }))
      .catch(requestError);
    }
    // Home container data
    case 'Home': {
      return getPage(HOME_SLUG, location.query)
      .then(({data}) => {
        return { page: data.data.active_page };
      })
      .catch(requestError);
    }
    // Page container data
    case 'Page': {
      const pathArray = params.splat.split('/');
      const slug = pathArray[pathArray.length - 1];
      return getPage(slug, location.query)
      .then(({data}) => {
        // Check that WP splat and Starward splat match else handle 404
        const starwardSplat = `/${params.splat}/`;
        const wpSplat = data.data.active_page ? data.data.active_page.link : '/';
        if (wpSplat !== starwardSplat) return handle404();
        // Return page data
        return ({ page: data.data.active_page });
      })
      .catch(requestError);
    }
    // Page container data
    case 'Login': {
      const { loginFormId } = routeProps;
      const splat = LOGIN_SLUG;
      const pathArray = splat.split('/');
      const slug = pathArray[pathArray.length - 1];
      return axios.all([
        getPage(slug, location.query),
        getForm(loginFormId),
      ])
      .then(([
         page,
         form
      ]) => {
        // Check that WP splat and Starward splat match else handle 404
        const starwardSplat = `/${splat}/`;
        const wpSplat = page.data.data.active_page ? page.data.data.active_page.link : '/';
        if (wpSplat !== starwardSplat) return handle404();

        const gravityForm = {payload: form.data.data.form, key: loginFormId };
        // Return page data
        return ({ page: page.data.data.active_page, gravityForm });
      })
      .catch(requestError);
    }
    // Blog container data
    case 'Blog': {
      const pageNumber = params.page ? params.page : 1;
      const perPage = params.perPage ? params.perPage : POSTS_PER_PAGE;
      return axios.all([
        getPage(BLOG_SLUG, location.query),
        getPosts(pageNumber, perPage)
      ])
      .then(([
        page,
        posts
      ]) => ({
        page: page.data.data.active_page,
        posts: posts.data.data.posts
      }))
      .catch(requestError);
    }
    // BlogPost container data
    case 'BlogPost': {
      return getPost(params.post, location.query)
      .then(({data}) => {
        return { activePost: data.data.activePost };
      })
      .catch(requestError);
    }
    // Category container data
    case 'Category': {
      const pageNumber = params.page ? params.page : 1;
      return getCategory(params.slug, pageNumber)
      .then(res => {
        return res.data.data;
      })
      .catch(requestError);
    }
    // Author container data
    case 'Author': {
      const pageNumber = params.page ? params.page : 1;
      return getAuthor(params.name, pageNumber)
      .then(res => {
        return res.data.data;
      })
      .catch(requestError);
    }
    // Search container data
    case 'Search': {
      return getSearchResults(location.query.term, location.query.type, location.query.page, location.query.perPage)
      .then(res => {
        return {
          search: res.data.data.search
        };
      })
      .catch(requestError);
    }
    default:
      return ({handleNotFound: '404'});
  }
};

export default fetchWPData;

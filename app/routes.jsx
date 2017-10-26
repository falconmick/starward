import React from 'react';
import { Route, IndexRoute } from 'react-router';
// Global URLs determined in app.js configuration
import { BLOG_SLUG, CATEGORY_SLUG, AUTHOR_SLUG, SEARCH_SLUG } from './config/app';
// Import containers used for below routes
import App from './containers/App';
import Page from './containers/Page';
import Blog from './containers/Blog';
import BlogPost from './containers/BlogPost';
import Category from './containers/Category';
import Author from './containers/Author';
import Search from './containers/Search';
// fetchWPData contains switch statement based on route name.
// It determines which data to load for route on the server
import { fetchWPData } from './fetch-data';
// Map paths to components
// Dynamic params declared using :
// Use name={} for switch statement in fetchData function
// Declare function to retreive data on the server using fetchData
export default () => {
  return (
    <Route path="/" component={App} name="App" >
      <IndexRoute component={Page} name="Home" />
      <Route path={`/${BLOG_SLUG}`} component={Blog} name="Blog" />
      <Route path={`/${BLOG_SLUG}/page/:page`} component={Blog} name="Blog" />
      <Route path={`/${BLOG_SLUG}/:post`} component={BlogPost} name="BlogPost" />
      <Route path={`/${CATEGORY_SLUG}/:slug`} component={Category} name="Category" />
      <Route path={`/${CATEGORY_SLUG}/:slug/page/:page`} component={Category} name="Category" />
      <Route path={`/${AUTHOR_SLUG}/:name`} component={Author} name="Author" />
      <Route path={`/${AUTHOR_SLUG}/:name/page/:page`} component={Author} name="Author" />
      <Route path={`/${SEARCH_SLUG}`} component={Search} name="Search" />
      <Route path="*" component={Page} name="Page" />
    </Route>
  );
};

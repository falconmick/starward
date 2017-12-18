import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
// Global URLs determined in app.js configuration
import { BLOG_SLUG, CATEGORY_SLUG, AUTHOR_SLUG, SEARCH_SLUG } from './config/app';
// Import containers used for below routes
import App from './containers/App';
import Page from './containers/Page';
import Blog from './containers/Blog';
import BlogPost from './containers/BlogPost';
import Category from './containers/Category';
import Author from './containers/Author';
// fetchWPData contains switch statement based on route name.
// It determines which data to load for route on the server
import { fetchWPData } from './fetch-data';
import { FormPage } from './containers/FormPage';
// Map paths to components
// Dynamic params declared using :
// Use name={} for switch statement in fetchData function
// Declare function to retreive data on the server using fetchData
export default () => {
  return (
    <Switch>
      <Route exact path='/' component={Page} />
      <Route path={`/${BLOG_SLUG}`} component={Blog} />
      <Route path={`/${BLOG_SLUG}/page/:page`} component={Blog} />
      <Route path={`/${BLOG_SLUG}/:post`} component={BlogPost} />
      <Route path={`/${CATEGORY_SLUG}/:slug`} component={Category} />
      <Route path={`/${CATEGORY_SLUG}/:slug/page/:page`} component={Category} />
      <Route path={`/${AUTHOR_SLUG}/:name`} component={Author} />
      <Route path={`/${AUTHOR_SLUG}/:name/page/:page`} component={Author} />
      <Route path="/preload-form" component={FormPage} formId="1" />
      <Route path="*" component={Page} name="Page" />
    </Switch>
  );
};

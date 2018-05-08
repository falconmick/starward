import React from 'react';
import { Route, IndexRoute } from 'react-router';
// Global URLs determined in app.js configuration
import { BLOG_SLUG, CATEGORY_SLUG, AUTHOR_SLUG, SEARCH_SLUG } from './config/app';
// Import containers used for below routes
import App from './containers/App';
import Page from './containers/Page';
import Archive from './containers/Archive';
import BlogPost from './containers/BlogPost/BlogPost';
import Category from './containers/Category';
import Author from './containers/Author';
import Search from './containers/Search/Search';
// fetchWPData contains switch statement based on route name.
// It determines which data to load for route on the server
import { fetchWPData } from './fetch-data';
import { FullPageIframe } from './containers/FullPageIframe';
// Map paths to components
// Dynamic params declared using :
// Use name={} for switch statement in fetchData function
// Declare function to retreive data on the server using fetchData
export default () => {
  return (
    <Route path="/" component={App} name="App" fetchData={fetchWPData}>
      <IndexRoute component={Page} name="Home" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}`} component={Archive} name="Blog" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}/page/:page`} component={Archive} name="Blog" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}/:post`} component={BlogPost} name="BlogPost" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}/${CATEGORY_SLUG}/:slug`} component={Archive} name="Category" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}/${CATEGORY_SLUG}/:slug/page/:page`} component={Archive} name="Category" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}/${SEARCH_SLUG}/:slug`} component={Archive} name="BlogSearch" fetchData={fetchWPData} />
      <Route path={`/${BLOG_SLUG}/${SEARCH_SLUG}/:slug/page/:page`} component={Archive} name="BlogSearch" fetchData={fetchWPData} />
      <Route path={`/${AUTHOR_SLUG}/:name`} component={Author} name="Author" fetchData={fetchWPData} />
      <Route path={`/${AUTHOR_SLUG}/:name/page/:page`} component={Author} name="Author" fetchData={fetchWPData} />
      <Route path={`/${SEARCH_SLUG}/:searchquery`} component={Search} name="Search" fetchData={fetchWPData} />
      <Route path={`/${SEARCH_SLUG}/:searchquery/:page`} component={Search} name="Search" fetchData={fetchWPData} />
      <Route path="/sharesaleapp" component={FullPageIframe} iframeUrl="https://sellmyshares.typeform.com/to/oQyB5C?typeform-embed=embed-fullpage" />
      <Route path="*" component={Page} name="Page" fetchData={fetchWPData} />
    </Route>
  );
};

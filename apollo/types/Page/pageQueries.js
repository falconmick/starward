import { WP_URL, HOME_SLUG, WP_API } from '../../../app/config/app';
import { getSlug, createWordpressGraphqlProxy, curryFindForSplat } from '../../utils/queryTools';
import { createPostPagerKey, createPaginationCallback } from '../../utils/pager';
import { cacheResolver } from '../../utils/redis';

const wpPageProxy = createWordpressGraphqlProxy('wp/v2/pages');

export const pageQuery = cacheResolver('pageQuery')((obj, args) => {
  const { splat = '' } = args;
  // if we have no slug, it's home so we need to add the Home Slug
  const splatNoSlash = splat.replace(/^ *\/|\/ *$/g, '');
  const slug = getSlug(splatNoSlash) || HOME_SLUG;
  // covert the splat into a full URL for matching (remove trailing /)
  const splatAsUrl = `${WP_URL}/${splatNoSlash || ''}`.replace(/\/$/, '');
  // the data will come back as an array of matching slugs, we need to
  // apply findPageForSplat to reduce that down to a single page
  const findPageForSplat = curryFindForSplat(splatAsUrl);
  return wpPageProxy.select(slug, {dataCallback: findPageForSplat, idPrefix: '?slug='});
});

export const pageSearchQuery = cacheResolver('pageSearchQuery')((obj, args) => {
  const { query, page = 1, perPage = 10 } = args;
  let queryArgs = {
    search: query,
  };
  if (!query) {
    queryArgs = {};
  }
  const id = createPostPagerKey({page, perPage, query});
  const paginationCallback = createPaginationCallback(page, perPage, id);
  return wpPageProxy.selectPage({ dataCallback: paginationCallback, page, perPage, queryArgs });
});

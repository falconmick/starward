import { WP_URL, HOME_SLUG } from '../../config/app';
import { getSlug, createWordpressGraphqlProxy, curryFindForSplat } from '../utils/queryTools';

const wpPageProxy = createWordpressGraphqlProxy('wp/v2/pages');


export default (obj, args) => {
  const { splat = '' } = args;
  // if we have no slug, it's home so we need to add the Home Slug
  const slug = getSlug(splat) || HOME_SLUG;
  // covert the splat into a full URL for matching (remove trailing /)
  const splatAsUrl = `${WP_URL}/${splat || ''}`.replace(/\/$/, '');
  // the data will come back as an array of matching slugs, we need to
  // apply findPageForSplat to reduce that down to a single page
  const findPageForSplat = curryFindForSplat(splatAsUrl);
  return wpPageProxy.select(slug, {dataCallback: findPageForSplat, idPrefix: '?slug='});
};

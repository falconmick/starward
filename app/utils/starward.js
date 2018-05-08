import { baseURL, BLOG_SLUG, isProduction, WP_URL } from '../config/app';
import { browserHistory } from 'react-router';

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const seoBackupBuilder = () => (() => {
  const _seoBackup = {};

  const _setBackupSeoImage = featuredImageUrl => {
    _seoBackup['opengraph-image'] = featuredImageUrl;
  };

  const _extractPTag = (str, pStart, pEnd) => {
    const slicedString = str.slice(pStart + 3, pEnd);
    return slicedString;
  };

  const _setBackupSeoDescription = description => {
    const startOfPTag = description.indexOf('<p>');
    const endOfPTag = description.indexOf('</p>');
    const isInPTag = startOfPTag !== -1 && endOfPTag !== -1;
    const safeDescription = isInPTag ? _extractPTag(description, startOfPTag, endOfPTag) : description;
    _seoBackup['opengraph-description'] = safeDescription;
  };

  const _build = () => {
    return {
      ..._seoBackup,
    };
  };

  // set defaults
  // _setBackupSeoDescription('Beautiful, bespoke home renovations and design.');

  return {
    setBackupSeoImage: _setBackupSeoImage,
    setBackupSeoDescription: _setBackupSeoDescription,
    build: _build,
  };
})();

export const debounce = (fn, time) => {
  let timeout;
  return () => {
    if (timeout) {
      timeout = clearTimeout(timeout);
    }
    timeout = setTimeout(fn.bind(null, ...arguments), time);
  };
};

export const bindRaf = (fn) => {
  let isRunning = null;
  let that = null;
  let args = null;

  const run = () => {
    isRunning = false;
    fn.apply(that, args);
  };

  return () => {
    that = this;
    args = arguments;

    if (isRunning) {
      return;
    }

    isRunning = true;
    requestAnimationFrame(run);
  };
};

export const preventDefaultAndCall = fn => event => {
  event.preventDefault();
  fn(event);
};

// interleave array
const _extractValueAt = index => arr => arr[index];
const _filterUndefined = val => typeof val !== 'undefined';

// combines [1,4,7], [2,5], [3,6,8,9,10] into 1,2,3,4,5,6,7,8,9,10
export const interleaveArray = (...arrays) => {
  const combinedArray = [];
  let hadValues = false;
  let i = 0;

  do {
    // for each array, get the item at index i, if none exists, don't add undefined to result
    const valuesAtIndex = arrays.map(_extractValueAt(i)).filter(_filterUndefined);
    // if we found results, try again with another itteration for more.
    hadValues = valuesAtIndex.length > 0;
    i++;
    // push all results into the combined array (note: if none found this will do nothing)
    combinedArray.push(...valuesAtIndex);
  } while (hadValues);

  return combinedArray;
};

// explode array of arrays into single array, i.e. [1,2,], [3, 4] => [1,2,3,4]
export const explode = arrOfArrs => [].concat.apply([], arrOfArrs);

// add slashes to start and end, then make sure that only 1 slash ever shows
// why? WP changed urls from starting with '/somthing/cool/' to 'somthing/cool'
// this code just makes things consistant no matter what version of wp you are using
export const safeUrl = url => `/${url}/`.replace(/([/\\]{2,}$)|(^[/\\]{2,})/g, '/');

export const appTrailingSlash = `${baseURL}/`.replace(/([/\\]{2,}$)/g, '/');

export const noDoubleSlash = url => url.replace(/([/\\]{2,})/g, '/').replace('https:/', 'https://').replace('http:/', 'http://');

export const getLinkToPage = url => noDoubleSlash(`${appTrailingSlash}${safeUrl(url)}`);

export const isArray = value => value && typeof value === 'object' && value.constructor === Array;

export const gotoUrl = url => {
  browserHistory.push(url);
};

// makes sure that each key and value has a start / and an end /
export const wrapKeyValueWithSafeUrl = redirects => {
  return Object.entries(redirects).reduce((accumulator, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    accumulator[safeUrl(key)] = safeUrl(value);
    return accumulator;
  }, {});
};

// this check only works in production as it
// doesn't run on the server... as it doesn't run
// on the server, if the browser IS  chrome
// the server will always return false wheras
// once it's re-calculated on the client
// it will be true causing the div this changes
// to nolonger match. I think it's ok if the markup
// doesn't 100% match and that the warning is just
// that ur markup changed so your SSR isn't matching
// your actual output.
export const isChrome = isProduction && canUseDOM && (() => {
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = winNav.userAgent.indexOf('OPR"') > -1;
  const isIEedge = winNav.userAgent.indexOf('Edge') > -1;
  const isIOSChrome = winNav.userAgent.match('CriOS');

  if (isIOSChrome) {
    return true;
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true;
  }
  return false;
})();

export const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};


export const removeAllNonDigits = str => {
  return str.replace(/\D/g, '');
};

const splitArrayReducer = (accumulator = {}, value, index) => {
  const { even = [], odd = [] } = accumulator;
  // if even
  if (index % 2 === 0) {
    return {
      even: [...even, value],
      odd,
    };
  }

  return {
    even,
    odd: [...odd, value],
  };
};

export const splitArray = array => array.reduce(splitArrayReducer, {});


export const extractPostLink = postItem => {
  const { title, slug } = postItem;
  const url = safeUrl(`${BLOG_SLUG}/${slug}`);
  return { title, url };
};

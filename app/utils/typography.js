
/*
 * Given 'baseStyleName' will append '-colorName'
 * i.e. getClassFor('text')('silver-grey) or 'silver grey'
 * will create a response of: '.text-silver-grey'
 */
import { isArray } from './starward';

export const getClassFor = (baseClassName) => (configurableSuffix) => {
  let suffix = configurableSuffix || '';

  // WP likes to return arrays from select results every so often, just to keep you on your toes!
  if (isArray(configurableSuffix)) {
    if (configurableSuffix.length > 0) {
      suffix = configurableSuffix[0] || '';
    } else {
      suffix = '';
    }
  }

  if (suffix === '') {
    return '';
  }
  // find any whitespace (/ {1,}/g) and replace with -
  const escapedColorName = suffix.replace(/ {1,}/g, '-').toLowerCase();
  return `${baseClassName}-${escapedColorName}`;
};

// The following are helpers for getClassFor;
export const getTextColorClassFor = getClassFor('text');
export const getBackgroundColorClassFor = getClassFor('background-color');
export const getGradiantColorClassFor = getClassFor('gradiant');
export const getColorClassFor = getClassFor('color');
export const getSectionMarginClassFor = getClassFor('section-margin');
export const getSectionPaddingClassFor = getClassFor('section-padding');
export const getAcfNameClassFor = getClassFor('acf');


export const redactString = maxLength => str => {
  if (str.length < maxLength) {
    return str;
  }
  const shortenedString = str.substring(0, maxLength);

  return shortenedString;
};

export const ellipsis = maxLength => str => {
  const maxLengthWithoutEllipsis = maxLength - 3;
  if (str.length < maxLengthWithoutEllipsis) {
    return str;
  }
  return redactString(maxLengthWithoutEllipsis)(str) + '...';
};
import { WP_URL} from '../config/app';

const joinResourceUrlToWp = (wpUrl) => `${WP_URL}${wpUrl}`;

export const getBasicWpImageUrl = (image) => {
  if (!image) {
    return null;
  }
  return joinResourceUrlToWp(image.url);
};

const safeAccessImageProp = (propertyName) => (image) => {
  if (!image) {
    return null;
  }
  return image[propertyName];
}
export const getWpImageAlt = safeAccessImageProp('alt');

export const getWpImageCaption = safeAccessImageProp('caption');

const defaultExtractor = image => image;

export const extractWpImageUrl = (image, size, autoOptimise = true, urlExtractor = defaultExtractor) => {
  if (!autoOptimise || !size || !image) {
    return getBasicWpImageUrl(image);
  }

  const sizeUrl = image.sizes[size];
  if (!sizeUrl) {
    return getBasicWpImageUrl(image);
  }
  return joinResourceUrlToWp(urlExtractor(sizeUrl));
};

export const curryExtractWpImageUrl = urlExtractor => (image, size, autoOptimise) => {
  return extractWpImageUrl(image, size, autoOptimise, urlExtractor);
};

export const extractWpFeaturedImageUrl = curryExtractWpImageUrl(image => image.source_url);

export const mapExtractWpImageUrl = ({size, autoOptimise = true}) => image => {
  return extractWpImageUrl(image, size, autoOptimise);
};

export const wpThumbnails = ['thumbnail', 'medium', 'medium_large', 'large'];
export const wpThumbnailBreakPoints = {
  thumbnail: '150px',
  medium: '300px',
  medium_large: '768px',
  large: '1024px',
}

const getThumbnailForImage = (imageSizes = []) => thumbnailName => {
  return {
    url: joinResourceUrlToWp(imageSizes[thumbnailName]),
    width: imageSizes[`${thumbnailName}-width`],
    name: thumbnailName,
  };
};

const extractWpImageSize = image => {
  const mapThumb = getThumbnailForImage(image);
  const sizes = wpThumbnails.map(mapThumb);
  return sizes;
};

export const extractWpThumbnails = image => {
  const { sizes: imageSizes, url } = image || {};
  const thumbnailSizes = extractWpImageSize(imageSizes);

  return {
    thumbs: thumbnailSizes,
    url: joinResourceUrlToWp(url),
  };
};

const reduceThumbToCssVar = (accumulator, thumb) => {
  const { url, name } = thumb;
// eslint-disable-next-line no-param-reassign
  accumulator[`--resp-${name}`] = `url(${url})`;
  return accumulator;
};

export const cssVariableThumbs = thumbs => {
  const variables = thumbs.reduce(reduceThumbToCssVar, {});
  return variables;
};
import { WP_RESOURCE_URL } from '../config/app';

const joinResourceUrlToWp = (wpUrl) => `${WP_RESOURCE_URL}${wpUrl}`;

const safeAccessImageProp = (propertyName) => (image) => {
	if (!image) {
		return null;
	}
	return image[propertyName];
}

const defaultExtractor = image => image;

export const getBasicWpImageUrl = (image) => {
	if (!image) {
		return null;
	}
	return joinResourceUrlToWp(image.url);
};

export const curryExtractWpImageUrl = urlExtractor => (image, size, autoOptimise) => {
	return extractWpImageUrl(image, size, autoOptimise, urlExtractor);
};

// Given a WP image from the API, extract the given size (thumbnail name as seen in the API response)
// you can ignore autoOptimise and urlExtractor as they're for more complicated usage
//
// example usage:
// // I would place all the thumbnail sizes in a constants file I can reference normally to avoid typos
// const WP_SIZE_MEDIUM_LARGE = 'medium_large';
// const mediumLargeThumb = extractWpImageUrl(someImageProp, WP_SIZE_MEDIUM_LARGE);
//
//
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

// applies extractWpImageUrl to a map, i.e: someArrayOfWpImages.map(mapExtractWpImageUrl(WP_SIZE_MEDIUM_LARGE))
// this would get all of the medium large images
export const mapExtractWpImageUrl = (size, autoOptimise = true) => image => {
	return extractWpImageUrl(image, size, autoOptimise);
};

// featured images have different properties that expose the url's so we need to use a custom extractor
export const extractWpFeaturedImageUrl = curryExtractWpImageUrl(image => image.source_url);

export const getWpImageAlt = safeAccessImageProp('alt');

export const getWpImageCaption = safeAccessImageProp('caption');

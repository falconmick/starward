import ImageMeta from './ImageMeta';

const MediaDetail = `
type MediaDetail {
    width: Int!
    height: Int!
    file: String!
    sizes: RawJson!
    image_meta: ImageMeta!
}
`;

export default () => [MediaDetail, ImageMeta];

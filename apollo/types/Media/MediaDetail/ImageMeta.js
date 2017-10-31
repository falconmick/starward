const ImageMeta = `
type ImageMeta {
    aperture: String!
    credit: String!
    camera: String!
    caption: String!
    created_timestamp: String!
    copyright: String!
    focal_length: String!
    iso: String!
    shutter_speed: String!
    title: String!
    orientation: String!
    keywords: [String!]!
}
`;

export default () => [ImageMeta];

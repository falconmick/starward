const ImageSize = `
type ImageSize {
    size: String!,
    width: Int!,
    height: Int!,
    mimeType: String!,
    sourceUrl: String!,
}
`;

export default () => [ImageSize];

const ImageSize = `
type ImageSize {
    size: String!,
    width: Int!,
    height: Int!,
    mime-type: String!,
    source_url: String!,
}
`;

export default () => [ImageSize];

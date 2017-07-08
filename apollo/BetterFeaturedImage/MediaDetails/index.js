import ImageSize from './ImageSize';

const MediaDetails = `
type MediaDetails {
    id: ID!,
    width: Int!,
    height: Int!,
    file: String!,
    sizes: [ImageSize]!
}
`;

export default () => [MediaDetails, ImageSize];

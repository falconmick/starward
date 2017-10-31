import MediaDetail from '../Media/MediaDetail/index';

const BetterFeaturedImage = `
type BetterFeaturedImage {
    id: ID!,
    alt_text: String!,
    caption: String!,
    description: String!,
    media_type: String!,
    media_details: MediaDetail!
    source_url: String!
}
`;

export default () => [BetterFeaturedImage, MediaDetail];

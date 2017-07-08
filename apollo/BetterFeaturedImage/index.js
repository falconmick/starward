import MediaDetails from './MediaDetails';

const BetterFeaturedImage = `
type BetterFeaturedImage {
    id: ID!,
    alt_text: String!,
    caption: String!,
    description: String!,
    media_type: String!,
    media_details: MediaDetails!
    source_url: String!
}
`;

export default () => [BetterFeaturedImage, MediaDetails];

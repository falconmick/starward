import SocialLink from '../SocialLink';

const Settings = `
type Settings {
    # WP generic data
    name: String!,
    emailAddress: String,
    phoneNumber: String,
    faxNumber: String,
    officeAddress: String,
    socialLinks: [SocialLink],
    trackingType: String,
    trackingId: String,
    googleMapsApiKey: String,
    additionalScripts: String
}
`;

export default () => [Settings, SocialLink];
export { resolvers } from './resolvers';

import SocialLink from './SocialLink/index';

/**
 * Example usage:
 *
 {
   settings {
     name
     socialLinks {
       type
       url
     }
   }
 }
 */
const Settings = `
type Settings {
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
export { resolvers } from './settingsResolvers';

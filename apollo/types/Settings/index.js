import SocialLink from './SocialLink/index';
import { resolvers } from './settingsResolvers';
import { apolloBundle } from '../../utils/apolloBundle';

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

export const SettingsBundle = apolloBundle({
  type: Settings,
  dependencies: [SocialLink],
  resolvers,
});

const Settings = `
  type Settings {
    # WP generic data
    name: String!,
    emailAddress: String,
    phoneNumber: String,
    faxNumber: String,
    officeAddress: String,
    socialLinks: JSON,
    trackingType: String,
    trackingId: String,
    googleMapsApiKey: String,
    additionalScripts: String
  }
`;

export default () => [Settings];
export { resolvers } from './resolvers';

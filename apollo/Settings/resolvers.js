const options = {
  emailAddress: 'test@test.com',
  phoneNumber: '08 91528 3215',
  faxNumber: '08 91528 3212',
  officeAddress: 'Somewhere',
  socialLinks: [
    {
      type: 'facebook',
      url: 'http://www.facebook.com/',
    },
    {
      type: 'twitter',
      url: 'http://www.twitter.com/',
    },
  ],
  trackingType: 'GTW',
  trackingId: 'awda2323',
  googleMapsApiKey: null,
  additionalScripts: null,
};

export const resolvers = {
  RootQuery: {
    settings: () => {
      return options;
    },
  },
};

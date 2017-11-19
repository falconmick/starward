import gql from 'graphql-tag';

export const yoastFragment = {
  archives: gql`
      fragment headYoast on Yoast {
          canonical
          title
          metadesc
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphDescription
          opengraphImage
          opengraphTitle
      }
  `
};

import { gql } from 'react-apollo';

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

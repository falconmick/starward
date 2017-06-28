const Yoast = `
 type Yoast {
 focuskw: String!
 title: String!
 metadesc: String!
 linkdex: String!
 metakeywords: String!
 metaRobotsNoIndex: MetaRobotsNoIndex!
 meta-robots-nofollow: String!
 meta-robots-adv: String!
 canonical: String!
 redirect: String!
 pengraph-title: String!
 opengraph-description: String!
 opengraph-image: String!
 twitter-title: String!
 twitter-description: String!
 twitter-image: String!
 }
 `;

export default () => [Yoast];

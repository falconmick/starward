const Yoast = `
 type Yoast {
 focuskw: String!
 title: String!
 metadesc: String!
 linkdex: String!
 metakeywords: String!
 canonical: String!
 redirect: String!
 }
 `;

export default () => [Yoast];

/*

 const Yoast = `
 type Yoast {
 focuskw: String!
 title: String!
 metadesc: String!
 linkdex: String!
 metakeywords: String!
 meta-robots-noindex: String!
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
 */
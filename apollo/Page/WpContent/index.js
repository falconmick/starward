const WpContent = `
type WpContent {
  raw: String
  rendered: String!
  protected: Boolean
}
`;

export default () => [WpContent];

const SubmitField = `
type SubmitField {
  id: ID!
  # if we get array this wont work
  value: String
}
input SubmitFieldInput {
  id: ID!
  # if we get array this wont work
  value: String
}
`;

export default () => [SubmitField];
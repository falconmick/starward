import Button from './Button';

/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *

 */
const Form = `
type Form {
    id: ID!
    title: String
    description: String
    labelPlacement: String!
    descriptionPlacement: String
    version: String!
    useCurrentUserAsAuthor: Boolean!
    postContentTemplateEnabled: Boolean!
    postTitleTemplateEnabled: Boolean!
    postTitleTemplate: String
    postContentTemplate: String
    isActive: Boolean!
    dateCreated: Date!
    isTrash: Boolean!
    button: Button!
    fields: 
}
`;

export default () => [Form, Button];
export { resolvers } from './formResolver';

import Button from './Button';
import Field from './Field';
import Confirmation from './Confirmation';

/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
 *
 * NOTE:
 * notifications - notifications are returned from the API request, however I currently cannot see use for this so
 *                I have ommited it from the form type
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
    fields: [Field!]
    confirmations: [Confirmation!]
}
`;

export default () => [Form, Button, Field, Confirmation];
export { resolvers } from './formResolver';

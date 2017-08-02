/**
 * Example usage:
 * note: never place variables into queries directly
 * use arguments: http://graphql.org/graphql-js/passing-arguments/
 *
 *
 * NOTEs:
 * - adminLabel has been removed as this is used purely front end, so admin labels are not much use
 * - inputs has been removed due to lack of understanding of what the type is (null currently)
 */
const Field = `
type Field {
  id: ID!
  label: String!
  type: String!
  isRequired: Boolean!
  size: String!
  errorMessage: String
  formId: Int!
  description: String
  allowsPrepopulate: Boolean!
  inputMask: Boolean!
  inputMaskValue: String
  inputType: String
  labelPlacement: String
  descriptionPlacement: String
  subLabelPlacement: String
  placeholder: String
  cssClass: String
  inputName: String
  visibility: String
  noDuplicates: Boolean!
  defaultValue: String
  # todo: transform csv/json or whatever it is into an array instead of string
  choices: String
  conditionalLogic: String
  productField: String
  # todo: why is the API giving us a string?
  enablePasswordInput: String
  # todo: convert into number with resolver??
  maxLength: String
  multipleFiles: Boolean!
  maxFiles: String
  calculationFormula: String
  calculationRounding: String
  enableCalculation: String
  disableQuantity: Boolean!
  displayAllCategories: Boolean!
  useRichTextEditor: Boolean!
  pageNumber: Int!
}
`;

export default () => [Field];
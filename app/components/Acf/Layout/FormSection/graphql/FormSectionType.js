// NOTE: Cannot import this inside of web app or redis will be included, which obviously doesn't work on client side!!

const FormSection = `
type FormSection {
  form: Form
  showTitle: Boolean
  showDescription: Boolean
}
`;

export const type = () => [FormSection];
export const typeName = 'FormSection';

import React, { PropTypes } from 'react';
import GravityForm from '../GravityForm/Form';

// note: if you use <GravityForms currySubmit ...> you can get access to the original submitForm func and do stuff after
// for example you could process the user login and at the same time wipe the password field + submit to the Gravity Form
// along side an IP address inside a hidden field.
//
// by implementing submitForm we stop the gravity form from submitting to the server (we don't want to submit the password to gravity forms!!)
const LoginForm = props => {
  const { formId } = props;
  return <GravityForm formId={formId} submitForm={(...formData) => console.log(formData)} />;
};

LoginForm.propTypes = {
  formId: PropTypes.any([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export const LoginPrompt = props => {
  const { formId } = props;
  const userLoggedIn = false;
  return (
    <div className="login-prompt-container">
      {!userLoggedIn && <LoginForm formId={formId} />}
    </div>
  );
};

LoginPrompt.propTypes = {
  formId: PropTypes.any([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};


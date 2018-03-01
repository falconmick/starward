import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GravityForm from '../GravityForm/Form';
import { login } from '../../actions/wpJwt';


const handleLoginFormSubmit = ({loginAction}) => ({gravityForm}) => (formId, fields) => {
  const { activeForm } = gravityForm || {};
  const { fields: formFields } = activeForm || {};

  const { id: usernameFieldId } = formFields.find(({label}) => label === 'username');
  const { id: passwordFieldId } = formFields.find(({label}) => label === 'password');

  const safeFields = fields.filter(({id}) => typeof id !== 'undefined');

  const { value: username } = safeFields.find(({id}) => id === usernameFieldId);
  const { value: password } = safeFields.find(({id}) => id === passwordFieldId);

  const loginDetails = {
    username,
    password
  };

  loginAction(loginDetails);
};

// note: if you use <GravityForms currySubmit ...> you can get access to the original submitForm func and do stuff after
// for example you could process the user login and at the same time wipe the password field + submit to the Gravity Form
// along side an IP address inside a hidden field.
//
// by implementing submitForm we stop the gravity form from submitting to the server (we don't want to submit the password to gravity forms!!)
const _LoginForm = props => {
  const { formId, loginAction } = props;
  return <GravityForm formId={formId} submitForm={handleLoginFormSubmit({loginAction})} />;
};


const mapStateToProps = ({account}) => {
  return {
    account
  };
};

const LoginForm = connect(mapStateToProps, { loginAction: login })(_LoginForm);

LoginForm.propTypes = {
  formId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
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
  formId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

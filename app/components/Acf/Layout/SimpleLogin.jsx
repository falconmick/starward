import React from 'react';
import { LoginPrompt } from '../../Common/LoginPrompt';

export const SimpleLogin = props => {
  const { loginFormId } = props;
  return (
    <section className="about_us">
      <LoginPrompt formId={loginFormId} />
    </section>
  );
};

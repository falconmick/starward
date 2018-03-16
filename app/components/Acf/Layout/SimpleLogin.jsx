import React from 'react';
import { LoginPrompt } from '../../Common/LoginPrompt';
import { LOGIN_FORM_ID } from '../../../config/app';

export const SimpleLogin = () => {
  return (
    <section className="about_us">
      <LoginPrompt formId={LOGIN_FORM_ID} />
    </section>
  );
};

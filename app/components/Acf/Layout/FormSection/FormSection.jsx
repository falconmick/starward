import React from 'react';
import GravityForm from '../../../GravityForm/Form';

export const FormSection = props => {
  const { form, formId: formIdNoCache, showTitle, showDescription } = props;
  const { id: formId } = form || {};

  // if for whatever reason the form doesn't resolve and we are sent down formId,
  // then use formId as a backup. This will require a page load then a form load seperatly
  const formIdToUse = formId || formIdNoCache || '-1';
  return (
    <GravityForm
      formId={formIdToUse}
      showTitle={showTitle}
      showDescription={showDescription}
    />
  );
};

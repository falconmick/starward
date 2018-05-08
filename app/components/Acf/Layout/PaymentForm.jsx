import React from 'react';
import { ColorSection } from '../Section';
import GravityForm from '../../GravityForm/Form';

export const PaymentForm = props => {
  const { form } = props;

  return (
    <ColorSection
      name="Payment Form"
      backgroundColor="light"
    >
      <GravityForm formId={form} />
    </ColorSection>
  );
};

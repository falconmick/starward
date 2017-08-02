import React from 'react';
import moment from 'moment';
import Form from '../GravityForm/Form';

export const Footer = props => {
  const { siteName } = props;
  return (
    <footer className="content-info" role="contentinfo">
      <Form formId="1" showTitle showDescription />
      <p>Copyright {siteName} {moment().format('YYYY')}</p>
    </footer>
  );
};

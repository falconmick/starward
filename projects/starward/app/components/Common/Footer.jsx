import React from 'react';
import moment from 'moment';
import './Footer.scss';

export const Footer = (props) => {
  const { siteName } = props;
  return (
    <footer className="content-info" role="contentinfo">
      <div className="wrap">
        <p>Copyright {siteName} {moment().format('YYYY')}</p>
      </div>
    </footer>
  );
};

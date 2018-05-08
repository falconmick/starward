import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { FooterMap } from './FooterMap';

const _FooterMapSection = props => {
  const { emailAddress, phoneNumber, faxNumber, footerMapHeader, footerMapButton, footerGradientTopColor = 'primary-light' } = props;

  const footerGradientName = `${footerGradientTopColor}-footer-gradient`;
  return (
    <section className={cx('footer-map-section', footerGradientName)}>
      <FooterMap
        showContent
        telephone={phoneNumber}
        email={emailAddress}
        fax={faxNumber}
        header={footerMapHeader}
        link={footerMapButton}
      />
    </section>
  );
};

export const mapFooterMapStateToProps = props => {
  const { starward } = props;
  const { settings } = starward;
  const { emailAddress, phoneNumber, faxNumber } = settings;

  // todo: migrate into settings page
  const footerMapHeader = 'Get in touch with us';
  const footerMapButton = {
    url: '#', title: 'SELL SHARES NOW',
  };
  return {
    emailAddress,
    phoneNumber,
    faxNumber,
    footerMapHeader,
    footerMapButton,
  };
};

export const FooterMapSection = connect(mapFooterMapStateToProps, null)(_FooterMapSection);

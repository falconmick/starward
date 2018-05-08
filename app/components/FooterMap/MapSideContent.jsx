import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Block/Header';
import { Phone, Email } from '../Block/Contact';
import { NavyButton } from '../Block/Button';

export const MapSideContent = props => {
  const { header, telephone, fax, email, link } = props;

  return (
    <div className="map-side-content">
      <Header h4 className="primary-header">{header}</Header>
      <p className="contact-info">T <Phone number={telephone} /></p>
      <p className="contact-info">F <Phone number={fax} /></p>
      <p className="contact-info">E <Email email={email} subject="Website Contact" /></p>
      <NavyButton wpLink={link}>Sell Shares Now</NavyButton>
    </div>
  );
};

MapSideContent.propTypes = {
  header: PropTypes.string,
  telephone: PropTypes.string,
  fax: PropTypes.string,
  email: PropTypes.string,
  link: PropTypes.object,
};

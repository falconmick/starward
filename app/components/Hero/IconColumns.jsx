import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveImage, UnResponsiveImage } from '../Block/ResponsiveImage';
import { BlueButton } from '../Block/Button';

const mapIconColumn = (iconColumn, index) => {
  const { icon, link } = iconColumn;
  const { target, title, url } = link;

  return (
    <div className="icon-column" key={index.toString()}>
      {icon && <UnResponsiveImage image={icon} className="hero-icon" />}
      <BlueButton target={target} href={url}>{title}</BlueButton>
    </div>
  );
};

export const IconColumns = props => {
  const { iconColumnsTitle, iconColumns } = props;

  return (
    <div className="icon-columns-container">
      {iconColumnsTitle && <p className="icon-columns-header">{iconColumnsTitle}</p>}
      <div className="icon-columns">
        {iconColumns.map(mapIconColumn)}
      </div>
    </div>
  );
};

IconColumns.propTypes = {
  iconColumnsTitle: PropTypes.string,
  iconColumns: PropTypes.array.isRequired,
};

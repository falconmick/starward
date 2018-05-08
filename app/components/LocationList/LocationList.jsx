import React from 'react';
import { connect } from 'react-redux';
import { mapLocationItem } from './LocationItem';

const _LocationList = props => {
  const { locations } = props;

  return (
    <div className="location-list-container">
      {locations && locations.map(mapLocationItem)}
    </div>
  );
};

const mapStateToProps = props => {
  const { starward } = props;
  const { settings } = starward;
  const { locations } = settings;
  return {
    locations,
  };
};

export const LocationList = connect(mapStateToProps)(_LocationList);

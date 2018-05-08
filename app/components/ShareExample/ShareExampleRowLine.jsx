import React from 'react';

const ShareExampleRowLine = props => {
  const { label, value, description } = props;

  return (
    <div className="share-example-row-line">
      <p className="label">{label}</p>
      <p className="value">{value}</p>
      <p className="description">{description}</p>
    </div>
  );
};

export const mapShareExampleRowLine = (props, index) => {
  return (
    <ShareExampleRowLine {...props} key={index.toString()} />
  );
};

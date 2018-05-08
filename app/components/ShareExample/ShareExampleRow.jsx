import React from 'react';
import { Header } from '../Block/Header';
import { mapShareExampleRowLine } from './ShareExampleRowLine';

const ShareExampleRow = props => {
  const { title, row } = props;

  return (
    <div className="share-example-row">
      <Header h5>{title}</Header>
      {row && row.map(mapShareExampleRowLine)}
    </div>
  );
};

export const mapShareExampleRow = (shareExample, index) => {
  return <ShareExampleRow {...shareExample} key={index.toString()} />
};

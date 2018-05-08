import React from 'react';
import ReactLoading from 'react-loading';
import { DisableScroll } from '../Block/DisableScroll';

export const Loading = () => {
  return (
    <div className="loading-container">
      <DisableScroll disableScroll />
      <ReactLoading type="cylon" color="#16B2DE" height={75} width={75} />
    </div>
  );
};

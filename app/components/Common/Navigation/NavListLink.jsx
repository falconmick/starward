import React from 'react';
import { Link } from 'react-router';
import { getSlug } from '../../../utils/wpHelpers';

export default (props) => {
  const { navItem } = props;
  // External Link Case
  if (navItem.classes && navItem.classes.indexOf('external') !== -1) {
    return <a href={`${getSlug(navItem.url)}`} target="_blank" rel="noopener noreferrer">{navItem.title.replace(/&#038;/g, '&')}</a>;
  }
  // Internal Link Case
  return <Link to={`${getSlug(navItem.url)}`}>{navItem.title.replace(/&#038;/g, '&')}</Link>;
};

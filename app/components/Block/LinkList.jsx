import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import { StarwardLink } from './StarwardLink';

const mapLinkListItem = (item, index) => {
  const { text, title, url } = item;
  const linkText = text || title;
  const escapedLinkText = he.decode(linkText);
  return (
    <li className="link-list-item" key={index.toString()}>
      <StarwardLink url={url}>{escapedLinkText}</StarwardLink>
    </li>
  );
};

export const LinkList = props => {
  const { links } = props;

  return (
    <ul className="link-list">
      {(links || []).map(mapLinkListItem)}
    </ul>
  );
};

LinkList.propTypes = {
  links: PropTypes.array,
};

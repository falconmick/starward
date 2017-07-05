import React from 'react';
import NavList from './NavList';
import NavListLink from './NavListLink';
import { getSlug } from '../../../utils/wpHelpers';

const getClassNames = (item, currentPath) => {
  const isActive = getSlug(item.url) === currentPath;
  return isActive ? `active ${item.classes}` : `${item.classes}`;
};

export default (props) => {
  const { navItems, currentPath } = props;
  return navItems && navItems.length > 0 ?
    (
      <ul>
        {navItems.map((item) => (
          <li key={item.title} className={getClassNames(item, currentPath)}>
            <NavListLink navItem={item} currentPath={currentPath} />
            <NavList navItems={item.children} currentPath={currentPath} />
          </li>
        ))}
      </ul>
    )
    : null;
};

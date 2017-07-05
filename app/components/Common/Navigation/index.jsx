import React from 'react';
import NavList from './NavList';

export default (props) => {
  const { items, currentPath } = props;
  return (
    <nav className="nav_banner" role="navigation">
      <NavList navItems={items} currentPath={currentPath} />
    </nav>
  );
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import he from 'he';
import { StarwardLink } from '../Block/StarwardLink';
import { safeUrl } from '../../utils/starward';
import { Collapsible } from '../Block/Collapsible';

// This is a Class and not a Pure Function because render props change every time new data is fed to them
// more info here: https://reactjs.org/docs/render-props.html#be-careful-when-using-render-props-with-reactpurecomponent
class NavItem extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  renderTitle() {
    const { url, title } = this.props;

    const isClickable = url !== '#';
    const unEscapedTitle = he.decode(title);
    const external = url.startsWith('http');

    if (isClickable) {
      return <StarwardLink external={external} url={url} className="nav-link"><span>{unEscapedTitle}</span></StarwardLink>;
    }
    return <span>{unEscapedTitle}</span>;
  }

  renderCollapsed() {
    const { children, currentPath } = this.props;
    return (
      <NavList
        ulClass="children-nav"
        currentPath={currentPath}
        navItems={children}
      />
    );
  }

  render() {
    const { children, url, className, currentPath } = this.props;

    const hasChildren = children && !!children.length;
    const isActiveRoute = currentPath === safeUrl(url);

    // by passing in currentPath we can cause an update when it changes
    return (
      <Collapsible
        li
        autoExpandDesktop
        className={cx('nav-item', className, { active: isActiveRoute })}
        disable={!hasChildren}
        renderTitle={this.renderTitle}
        renderCollapsed={this.renderCollapsed}
        currentPath={currentPath}
      />
    );
  }
}

const mapNavItem = ({currentPath, toggleChildren}) => (navItem, index) => {
  return <NavItem {...navItem} toggleChildren={toggleChildren} key={index.toString()} currentPath={currentPath} />;
};

export const NavList = (props, index) => {
  const { navItems, currentPath, toggleChildren, ulClass = '' } = props;
  return (
    <ul key={index.toString()} className={ulClass}>
      {(navItems || []).map(mapNavItem({currentPath, toggleChildren}))}
    </ul>
  );
};

export const Navigation = (props) => {
  const { items, currentPath, className } = props;
  return (
    <nav className={cx('nav_banner', className)}>
      <NavList navItems={items} currentPath={currentPath} ulClass="root-nav-ul" />
    </nav>
  );
};

Navigation.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
  currentPath: PropTypes.string,
};

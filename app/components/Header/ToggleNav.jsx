import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { preventDefaultAndCall } from '../../utils/starward';
import { TOGGLE_NAV } from '../../actions/types/index';
import { ImgIcon } from '../Block/ImgIcon';
import { LinkAction } from '../Block/StarwardLink';

const _ToggleNav = props => {
  const { navOpen, toggleNav } = props;

  return (
    <LinkAction className="toggle-nav-container" onInteraction={toggleNav} tabIndex="0">
      <div className={cx('toggle-nav', {open: navOpen})}>
        <ImgIcon src="/assets/images/url/menu.svg" />
      </div>
    </LinkAction>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNav: () => dispatch({type: TOGGLE_NAV}),
  };
};

const mapStateToProps = props => {
  const { navOpen } = props;
  return {
    navOpen,
  };
}

export const ToggleNav = connect(mapStateToProps, mapDispatchToProps)(_ToggleNav);

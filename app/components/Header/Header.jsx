import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Headroom from 'react-headroom';
import { connect } from 'react-redux';
import { TopHeader } from './TopHeader';
import { BottomHeader } from './BottomHeader';
import { canUseDOM } from '../../utils/starward';

export class _Header extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      detached: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { navOpen } = this.props;
    const { navOpen: prevNavOpen } = prevProps;

    if (canUseDOM && navOpen !== prevNavOpen) {
      if (navOpen) {
        window.LC_API.hide_chat_window();
      } else {
        window.LC_API.minimize_chat_window();
      }
    }
  }

  render() {
    const { siteName, navigation, currentPath, navOpen } = this.props;
    return (
      <header className={cx('pinable', {'nav-open': navOpen})}>
        <Headroom disableInlineStyles>
          <div id="banner" role="banner">
            <div className={cx('wrapper-container header-container', {'nav-open': navOpen, 'nav-closed': !navOpen})}>
              <TopHeader siteName={siteName} />
              <div className="border-separator"><div className="line" /></div>
              <BottomHeader navigation={navigation} currentPath={currentPath} navOpen={navOpen} />
            </div>
          </div>
        </Headroom>
      </header>
    );
  }
}

const mapStateToProps = props => {
  const { navOpen } = props;
  return {
    navOpen,
  };
};

export const Header = connect(mapStateToProps)(_Header);

Header.propTypes = {
  navigation: PropTypes.array.isRequired,
  currentPath: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
};

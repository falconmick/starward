import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { blankFunction } from '../../utils/component';
import { LinkAction, StarwardLink } from './StarwardLink';
import { SVGIcon } from './SVGIcon';

const DefaultExpandButton = () => <SVGIcon name="close_expand" />;

// note: autoExpandDesktop will break at the point in which we swap from showing mobile to desktop navigation.
// for the project this came with that was at sizes larger than tablets
export class Collapsible extends PureComponent {
  constructor(props) {
    super(props);

    const { startExpanded } = props;
    this.state = { isExpanded: startExpanded };

    this.expandCollapsed = this.expandCollapsed.bind(this);
    this.closeCollapsed = this.closeCollapsed.bind(this);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  expandCollapsed() {
    this.setState({ isExpanded: true });
  }

  closeCollapsed() {
    this.setState({ isExpanded: false });
  }

  toggleCollapsed() {
    this.setState(({isExpanded}) => {
      return {
        isExpanded: !isExpanded
      };
    });
  }

  render() {
    const { renderTitle, expandTitleClick, renderExpandButton, renderCollapsed, autoExpandDesktop, autoExpandTablet, expandButtonMinWidth, disable, className } = this.props;
    // possible wrapper elements
    const { div, p, li } = this.props;
    const { isExpanded } = this.state;
    const { expandCollapsed, closeCollapsed, toggleCollapsed } = this;

    const renderArgs = {
      expandCollapsed,
      closeCollapsed,
      toggleCollapsed,
      isExpanded,
    };

    let Wrapper = 'div';

    if (p) {
      Wrapper = 'p';
    } else if (li) {
      Wrapper = 'li';
    }

    return (
      <Wrapper className={cx('details', className, {'auto-expand-desktop': autoExpandDesktop, 'auto-expand-tablet': autoExpandTablet, expanded: isExpanded, disable})}>
        <LinkAction
          className="summary"
          disabled={!expandTitleClick}
          onInteraction={this.toggleCollapsed}
        >
          { renderTitle(renderArgs) }
        </LinkAction>
        <LinkAction
          className="expand-button"
          tabIndex="0"
          onInteraction={this.toggleCollapsed}
          style={{flexBasis: expandButtonMinWidth}}
        >
          { renderExpandButton(renderArgs) }
        </LinkAction>
        <div className="collapsed">
          { renderCollapsed(renderArgs) }
        </div>
      </Wrapper>
    );
  }
}

Collapsible.propTypes = {
  renderTitle: PropTypes.func,
  renderExpandButton: PropTypes.func,
  expandButtonMinWidth: PropTypes.string,
  renderCollapsed: PropTypes.func,
  startExpanded: PropTypes.bool,
  autoExpandDesktop: PropTypes.bool,
  autoExpandTablet: PropTypes.bool,
  disable: PropTypes.bool,
  expandTitleClick: PropTypes.bool,
  className: PropTypes.string,
  div: PropTypes.bool,
  p: PropTypes.bool,
  li: PropTypes.bool,
};

Collapsible.defaultProps = {
  renderTitle: blankFunction,
  renderExpandButton: DefaultExpandButton,
  renderCollapsed: blankFunction,
};

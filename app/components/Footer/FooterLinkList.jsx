import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LinkList } from '../Block/LinkList';
import { Header } from '../Block/Header';
import { Collapsible } from '../Block/Collapsible';

export class FooterLinkList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.renderCollapsed = this.renderCollapsed.bind(this);
  }

  renderTitle() {
    const { title } = this.props;
    return (
      <Header h3>{title}</Header>
    );
  }

  renderCollapsed() {
    const { links } = this.props;
    return (
      <LinkList links={links} />
    );
  }

  render() {
    const { className } = this.props;

    return (
      <Collapsible
        autoExpandDesktop
        expandTitleClick
        className={className}
        renderTitle={this.renderTitle}
        renderCollapsed={this.renderCollapsed}
      />
    );
  }
}

FooterLinkList.propTypes = {
  links: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

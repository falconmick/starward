import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { WP_URL } from '../../config/app';

const rewriteImgUrls = content => {
  const replaceStr = `="${WP_URL}/assets/`;
  // fixes: ' /asserts/someasset.jpg' => ' www.wpurl.com/asserts/someasset.jpg'
  const spaceAssetContentFix = content.replace(/="assets\//g, ' ' + replaceStr);
  return spaceAssetContentFix;
};

export class RenderContent extends PureComponent {
  constructor(props) {
    super(props);

    this.reassignHref = this.reassignHref.bind(this);
  }

  componentDidMount() {
    this.reassignHref();
  }

  componentDidUpdate() {
    this.reassignHref();
  }

  // remove click handler on a href and replace with react-router navigation
  reassignHref() {
    const { useReactRouter } = this.props;
    if (useReactRouter) {
      const renderContent = findDOMNode(this.renderContent);
      const anchors = renderContent.getElementsByTagName('a');
      for (let i = 0; i < anchors.length; i++) {
        anchors[i].onclick = (mouseEvent) => {
          const { target } = mouseEvent;
          const { href } = target;
          const localRegex = new RegExp(location.host);

          // if the link is to a local page, use single page navigation
          if (localRegex.test(href)) {
            browserHistory.push(href);
          } else {
            window.location.href = href;
          }
          return false;
        };
      }
    }
  }

  render() {
    const { className, content, element: Element = 'div', rewriteAssets, onClick } = this.props;
    const contentToRender = rewriteAssets ? rewriteImgUrls(content) : content;
    return (
      <Element
        onClick={onClick}
        className={cx('entry-content', className)}
        ref={(renderContent) => { if (renderContent) this.renderContent = renderContent; }}
        dangerouslySetInnerHTML={{__html: contentToRender}}
      />
    );
  }
}

RenderContent.propTypes = {
  useReactRouter: PropTypes.bool,
  rewriteAssets: PropTypes.bool,
  className: PropTypes.string,
  element: PropTypes.string,
  content: PropTypes.string,
};

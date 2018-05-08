import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../Block/Header';
import { BlueButton } from '../Block/Button';
import { hardCodedRedirects } from '../../config/redirects';
import { gotoUrl, safeUrl } from '../../utils/starward';

const PageNotFound = () => {
  return (
    <div>
      <Header h1>Oops, This Page Could Not Be Found!</Header>
      <p className="four-oh-four-label">404</p>
      <BlueButton href="/">Home</BlueButton>
    </div>
  );
};

const Redirecting = () => {
  return (
    <div>
      <Header h1>Redirecting you!</Header>
    </div>
  );
};

export class _FourOhFour extends Component {
  constructor(props) {
    super(props);

    const { pathname } = props;
    const redirectPath = hardCodedRedirects[safeUrl(pathname)];
    if (redirectPath) {
      gotoUrl(redirectPath);
    }

    this.state = { isRedirecting: !!redirectPath };
  }
  render() {
    const { isRedirecting } = this.state;
    return (
      <div className="four-oh-four">
        {isRedirecting ? <Redirecting /> : <PageNotFound />}
      </div>
    );
  }
}

const mapStateToProps = props => {
  const { routing } = props || {};
  const { locationBeforeTransitions } = routing || {};
  const { pathname } = locationBeforeTransitions || {};
  return {
    pathname,
  };
}

export const FourOhFour = connect(mapStateToProps)(_FourOhFour);

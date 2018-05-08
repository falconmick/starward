import React from 'react';
import cx from 'classnames';
import { Header } from '../Block/Header';
import { RenderContent } from '../Content/RenderContent';
import { BlueButton } from '../Block/Button';

export const mapPackageTabTitle = ({activeTab, setActiveTab}) => (pkg, index) => {
  const { tabName } = pkg;

  return (
    <li className={cx('package-tab-title', {active: activeTab === index})} key={index.toString()} onClick={() => setActiveTab(index)}>
      {tabName}
    </li>
  );
};

export const mapPackageBody = ({activeTab}) => (pkg, index) => {
  const { name, flag, cost, costSubtitle } = pkg;

  return (
    <div className={cx('package-body', {active: activeTab === index})} key={index.toString()}>
      <div className="top-of-body med-padded">
        {flag && <div className="flag">{flag}</div>}
        <Header h5 className="package-name">{name}</Header>
        <p className="cost">{cost}</p>
        <RenderContent className="top-body" content={costSubtitle} />
      </div>
    </div>
  );
};

export const mapPackageFooter = ({activeTab}) => (pkg, index) => {
  const { details, button } = pkg;

  return (
    <div className={cx('package-footer', {active: activeTab === index})} key={index.toString()}>
      <div className="bottom-of-body med-padded">
        <RenderContent content={details} rewriteAssets useReactRouter />
      </div>
      <div className="button-wrapper">
        <div className="med-padded">
          <BlueButton wpLink={button} />
        </div>
      </div>
    </div>
  );
};

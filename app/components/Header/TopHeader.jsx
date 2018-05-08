import React from 'react';
import SearchForm from '../Search/SearchForm';
import { BrandLogo } from '../Block/BrandLogo';
import { SellShareNowButton } from '../Block/Button';
import { ToggleNav } from './ToggleNav';

export const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="left-header-content">
        <BrandLogo src="/assets/images/url/sellmyshares-logo.svg" url="/" />
      </div>
      <div className="right-header-content">
        <SellShareNowButton>Sell Shares Now</SellShareNowButton>
        <SearchForm placeholder="What are you looking for?" className="inline-search-form" />
      </div>
      <ToggleNav />
    </div>
  );
};

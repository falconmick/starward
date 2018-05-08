import React from 'react';
import PropTypes from 'prop-types';
import he from 'he';
import { Select } from '../Block/Select';
import SearchForm from '../Search/SearchForm';
import { Header } from '../Block/Header';
import { gotoUrl, noDoubleSlash } from '../../utils/starward';

const gotoCategory = ({postSlug, categorySlug}) => selectedItem => {
  const { value, label } = selectedItem;
  if (selectedItem.value === '') {
    gotoUrl(noDoubleSlash(`/${postSlug}/`));
  } else {
    gotoUrl(noDoubleSlash(`/${postSlug}/${categorySlug}/${value}`));
  }
};

export const Categories = props => {
  const { categories, postSlug, categorySlug, currentSearch } = props;


  if (!categories) {
    return <span />;
  }

  const categoryOptions = categories.map(({slug: value, name}) => ({value, label: he.decode(name)}));
  categoryOptions.push({value: '', label: 'Latest'});

  return (
    <nav className="posts_categories primary-bar wrapper-small med-padded">
      <Header h3 className="cat-header">Filter by category or enter your search below</Header>
      <div className="wrapper">
        <Select options={categoryOptions} defaultValue={categoryOptions[categoryOptions.length - 1]} onChange={gotoCategory({postSlug, categorySlug})} />
        <SearchForm placeholder="Looking for something in particular?" postSearch currentSearch={currentSearch} />
      </div>
    </nav>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
  currentSearch: PropTypes.string,
};

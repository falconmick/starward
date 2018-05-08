import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { browserHistory } from 'react-router';
import { ImgIcon } from '../Block/ImgIcon';
import { LinkAction } from '../Block/StarwardLink';
import { BLOG_SLUG, SEARCH_SLUG } from '../../config/app';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    const { currentSearch = '' } = props;

    this.state = {
      search: currentSearch,
    };

    this.searchInputHandler = this.searchInputHandler.bind(this);
    this.formSearch = this.formSearch.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillUnmount() {
    this.setState({search: ''});
  }

  searchInputHandler(event) {
    const search = event.target.value;
    this.setState({search});
  }

  formSearch(event) {
    event.preventDefault();
    this.search();
  }

  search() {
    const { postSearch } = this.props;

    if (postSearch) {
      browserHistory.push(`/${BLOG_SLUG}/${SEARCH_SLUG}/${this.state.search}`);
    } else {
      browserHistory.push(`/search/${this.state.search}`);
    }
  }

  render() {
    const { className, placeholder } = this.props;
    return (
      <form role="search" className={cx('search-form', className)} onSubmit={this.formSearch}>
        <input type="text" placeholder={placeholder || 'search'} onChange={this.searchInputHandler} name="search" className="search-input" />
        <LinkAction onInteraction={this.search} tabIndex="0">
          <ImgIcon src="/assets/images/url/search.svg" />
        </LinkAction>
      </form>
    );
  }
}

SearchForm.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  postSearch: PropTypes.bool,
  currentSearch: PropTypes.string,
};

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { GridView } from './GridView';

const mapRunRender = renderable => renderable();

const chunkArray = (array, size) => {
  const chunkHolder = [];
  while (array.length > 0) {
    chunkHolder.push(array.splice(0, size));
  }

  return chunkHolder;
};

const clamp = (min, max) => {
  return (val) => Math.min(Math.max(val, min), max);
};

// builds up the pages on mount, so currently there is no adding items during runtime
export class PreloadedGridView extends PureComponent {
  constructor(props) {
    super(props);

    this.onPageChange = this.onPageChange.bind(this);

    const { renderables, perPage, initialPage } = props;
    const chunks = chunkArray(renderables, perPage);
    const safePageNumber = clamp(0, chunks.length)(initialPage - 1);

    this.state = {
      chunks,
      renderables: chunks[safePageNumber],
      totalPages: chunks.length,
      activePage: safePageNumber + 1,
    };
  }

  onPageChange(pageNumber) {
    this.setState((state) => {
      const { chunks, totalPages } = state;
      const safePageNumber = clamp(0, totalPages - 1)(pageNumber - 1);
      return {
        renderables: chunks[safePageNumber],
        activePage: safePageNumber + 1,
      };
    });
  }

  render() {
    const { renderables, totalPages, activePage } = this.state;
    const { className } = this.props;

    return (
      <GridView onPageChange={this.onPageChange} totalPages={totalPages} activePage={activePage} className={className}>
        { renderables.map(mapRunRender) }
      </GridView>
    );
  }
}

PreloadedGridView.propTypes = {
  perPage: PropTypes.number,
  renderables: PropTypes.array,
  initialPage: PropTypes.number,
  className: PropTypes.string,
};

PreloadedGridView.defaultProps = {
  perPage: 20,
  renderables: [],
  initialPage: 1,
};

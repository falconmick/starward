import React from 'react';
import PropTypes from 'prop-types';
import { StarwardLink } from './StarwardLink';
import { ellipsis } from '../../utils/typography';

const breadcrumbEllipsis = ellipsis(40);

const createBreadcrub = (props, index) => {
  const { name, link } = props;

  const unescapeName = name.replace('&amp;', '&');

  return (
    <li className="breadcrumb" key={index}>
      &nbsp;{ index !== 0 && ' /'}&nbsp;
      {link && (<StarwardLink url={link} className="bread-link">
        { breadcrumbEllipsis(unescapeName) }
      </StarwardLink>)}
      {!link && <span>{ breadcrumbEllipsis(unescapeName) }</span>}
    </li>
  );
};

export const Breadcrumbs = props => {
  const { links } = props;

  return (
    <section className="breadcrumbs">
      <div className="wrapper">
        <div className="breadcrumb-wrapper">
          <ul className="breadcrumb-items">
            { links.map(createBreadcrub) }
          </ul>
        </div>
      </div>
    </section>
  );
};

Breadcrumbs.propTypes = {
  links: PropTypes.array,
};

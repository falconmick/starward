import React, { PropTypes } from 'react';
import cx from 'classnames'
import moment from 'moment';

export const PostMeta = props => {
  const { date, author, className } = props;
  return (
    <div className={cx('entry-meta', className)}>
      {author ?
        <span className="byline author vcard">
          Written By {author.name + ', '}
        </span>
        : <span /> }
      <time className="updated" dateTime={moment(date).format('YYYY-MM-DD HH:mm')}>
        {moment(date).format('MMM Do, YYYY')}
      </time>
    </div>
  );
};

PostMeta.propTypes = {
  date: PropTypes.string,
  author: PropTypes.object,
  className: PropTypes.string,
};

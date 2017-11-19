import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export const PostMeta = props => {
  const { modified, author } = props;

  const modifiedMoment = moment(modified);
  return (
    <div className="entry-meta">
      <time className="updated" dateTime={modifiedMoment.format('YYYY-MM-DD HH:mm')}>
        Posted {modifiedMoment.calendar()}
      </time>
      {author ?
        <p className="byline author vcard">
          By <Link to={`/author/${author.slug}`} rel="author" className="fn">{author.name}</Link>
        </p>
      : <span /> }
    </div>
  );
};

PostMeta.propTypes = {
  date: PropTypes.string,
  author: PropTypes.object,
};

import React from 'react';
import moment from 'moment';
import { WP_SIZE_THUMBNAIL } from '../../utils/constants';
import { RenderContent } from '../Content/RenderContent';
import { StarwardLink } from '../Block/StarwardLink';
import { ResponsiveBackgroundCover } from '../Block/ResponsiveBackground';
import { ImgIcon } from '../Block/ImgIcon';
import { ellipsis, redactString } from '../../utils/typography';

const FacebookReview = props => {
  const { picture, name, reviewEntryDate, reviewStars, reviewOrigin, reviewMessage } = props;

  const reviewMoment = moment(reviewEntryDate, 'DD/MM/YYYY hh:mm A');
  const reviewAge = reviewMoment.fromNow();
  return (
    <div className="facebook-review">
      <div className="top-panel">
        <ResponsiveBackgroundCover className="profile-picture" image={picture} size={WP_SIZE_THUMBNAIL} />
        <div className="review-meta">
          <p className="reviewee">
            <span className="name">{redactString(20)(name)}</span>
            <span className="review-stars">{reviewStars}<ImgIcon className="star" src="/assets/images/url/star.svg" /></span>
          </p>
          <p className="time-ago">{reviewAge}</p>
        </div>
      </div>
      <div className="body">
        <p className="review-message">{ellipsis(85)(reviewMessage)}</p>
        <StarwardLink className="review-link" url={reviewOrigin} external>See More Reviews</StarwardLink>
      </div>
    </div>
  );
};

export const mapFacebookReview = (props, index) => {
  return (
    <FacebookReview {...props} key={index.toString()} />
  );
};

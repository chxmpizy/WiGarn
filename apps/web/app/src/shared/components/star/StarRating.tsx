import React from 'react';

import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="ml-1 flex items-center gap-0.5">
      {Array(5)
        .fill(null)
        .map((_, idx) => {
          const full = Math.floor(rating);
          return (
            <FontAwesomeIcon
              key={idx}
              icon={
                idx === full && rating % 1 !== 0
                  ? faStarHalfAlt
                  : idx >= rating
                    ? faRegularStar
                    : faStar
              }
              name="star"
              className="text-xs text-yellow-500"
            />
          );
        })}
      <h1 className="text-primary hidden px-1 text-center text-sm max-sm:inline-block md:block">
        {rating}/5
      </h1>
    </div>
  );
};

export default StarRating;

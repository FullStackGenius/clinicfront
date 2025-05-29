import React from 'react';

interface StarRatingProps {
  rating: number; // Value between 0 and 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const starStyle = {
    '--rating': rating.toString(),
  } as React.CSSProperties;

  return (
    <div
      className="star-rating"
      style={starStyle}
      aria-label={`Rated ${rating} out of 5`}
    />
  );
};

export default StarRating;

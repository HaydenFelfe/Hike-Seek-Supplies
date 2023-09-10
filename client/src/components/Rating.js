import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

function Rating(props) {
  const { rating, numReviews } = props;
  const stars = [];

  // Calculate the full stars (e.g., rating = 3.5 => full stars: 3)
  const fullStars = Math.floor(rating);

  // Check if there is a half star
  const hasHalfStar = rating - fullStars >= 0.5;

  // Push full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<i key={i} className="fa fa-star"></i>); // Font Awesome star icon
  }

  // Push half star if applicable
  if (hasHalfStar) {
    stars.push(<i key="half" className="fa fa-star-half-o"></i>); // Font Awesome half-star icon
  }

  // Calculate the remaining empty stars
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<i key={`empty-${i}`} className="fa fa-star-o"></i>); // Font Awesome empty star icon
  }

  return (
    <div className="rating">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
      <span> {numReviews} reviews</span>
    </div>
  );
}

export default Rating;

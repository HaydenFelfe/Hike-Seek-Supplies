import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating'; // Import the Rating component
import './ProductBox.css'; // Import your custom CSS

const ProductBox = ({
  title,
  price,
  description,
  image,
  rating, // Ensure that the rating is a valid number
  numReviews,
  slug,
  isOnSale, // Add isOnSale prop to determine if the product is on sale
  discountPercentage, // Add discountPercentage prop to get the discount percentage
}) => {
  const handleAddToCart = () => {
    // Implement the logic to add the product to the cart here
    // For now, you can simply display a message
    alert(`Added ${title} to the cart`);
  };

  const renderPrice = () => {
    if (isOnSale) {
      const discountedPrice = (price * (100 - discountPercentage)) / 100;
      const formattedDiscountedPrice = discountedPrice.toFixed(2); // Limit to two decimal places
      return (
        <>
          <span className="original-price original-price-crossed">
            ${price}
          </span>
          &nbsp; {/* Add a space character */}
          <span className="discounted-price">${formattedDiscountedPrice}</span>
        </>
      );
    } else {
      return (
        <span className="product-price">
          ${price.toFixed(2)} {/* Limit to two decimal places */}
        </span>
      );
    }
  };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <Card className="product-box">
        <Link to={`/product/${slug}`}>
          <Card.Img
            className="product-image"
            variant="top"
            src={image}
            alt={title}
          />
        </Link>
        <div className="product-details text-center">
          <Link to={`/product/${slug}`} className="product-title">
            {title}
          </Link>
          <div className="d-flex justify-content-center align-items-center">
            {/* Center the content horizontally and vertically */}
            <Rating rating={parseFloat(rating)} numReviews={numReviews} />
            {/* Ensure rating is a valid number */}
          </div>
          <Card.Text className="product-description">{description}</Card.Text>
          <div className="product-price">{renderPrice()}</div>
          {/* Add a cart button */}
          <Button
            onClick={handleAddToCart}
            className="btn-primary product-button"
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductBox;

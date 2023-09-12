import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating'; // Import the Rating component
import './ProductBox.css'; // Import your custom CSS
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations';
import AuthService from '../utils/auth';

const ProductBox = ({
  title,
  price,
  description,
  image,
  rating,
  numReviews,
  slug,
  isOnSale,
  discountPercentage,
  productId,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart({
        variables: {
          productId: productId,
        },
      })
        .then(() => {
          alert(`Added ${title} to the cart`);
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
          alert('Error adding to cart. Please try again.');
        });
    } else {
      alert('Must be logged in to add to cart');
    }
  };

  useState(() => {
    setIsLoggedIn(AuthService.loggedIn());
  }, []);

  const renderPrice = () => {
    if (isOnSale) {
      const discountedPrice = (price * (100 - discountPercentage)) / 100;
      const formattedDiscountedPrice = discountedPrice.toFixed(2);
      return (
        <>
          <span className="original-price original-price-crossed">
            ${price}
          </span>
          &nbsp;
          <span className="discounted-price">${formattedDiscountedPrice}</span>
        </>
      );
    } else {
      return <span className="product-price">${price.toFixed(2)}</span>;
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
            <Rating rating={parseFloat(rating)} numReviews={numReviews} />
          </div>
          <Card.Text className="product-description">{description}</Card.Text>
          <div className="product-price">{renderPrice()}</div>
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

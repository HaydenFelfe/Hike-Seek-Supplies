import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';
import './ProductBox.css';
import { useMutation } from '@apollo/client';
import { ADD_TO_CART } from '../utils/mutations';
import { GET_USER_CART } from '../utils/queries';
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
  const isLoggedIn = AuthService.loggedIn(); // Check if the user is logged in
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_USER_CART }],
  });
  const [addToCartMessage, setAddToCartMessage] = useState(''); // Initialize the message state

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart({
        variables: {
          productId: productId,
        },
      })
        .then(() => {
          setAddToCartMessage(`Added ${title} to the cart`); // Set success message
          // Clear the message after 2 seconds
          setTimeout(() => {
            setAddToCartMessage('');
          }, 2000);
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
          setAddToCartMessage('Error adding to cart. Please try again.'); // Set error message
          // Clear the message after 2 seconds
          setTimeout(() => {
            setAddToCartMessage('');
          }, 2000);
        });
    } else {
      setAddToCartMessage('Must be logged in to add to cart'); // Set login required message
      // Clear the message after 2 seconds
      setTimeout(() => {
        setAddToCartMessage('');
      }, 2000);
    }
  };

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
          {isLoggedIn && (
            <>
              <Button
                onClick={handleAddToCart}
                className="btn-primary product-button"
              >
                Add to Cart
              </Button>
              {addToCartMessage && (
                <p className="add-to-cart-message">{addToCartMessage}</p>
              )}
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProductBox;

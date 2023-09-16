import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT_BY_SLUG, GET_USER_CART } from '../utils/queries';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import AuthService from '../utils/auth';
import { ADD_TO_CART } from '../utils/mutations';
import { Row, Col, Badge, Button, Card, ListGroup } from 'react-bootstrap';

const ProductPage = () => {
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
  });

  const [addToCartMessage, setAddToCartMessage] = useState(''); // Initialize the message state
  const isLoggedIn = AuthService.loggedIn(); // Check if the user is logged in
  const [addToCart] = useMutation(ADD_TO_CART, {
    refetchQueries: [{ query: GET_USER_CART }],
  });

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart({
        variables: {
          productId: product._id,
        },
      })
        .then(() => {
          setAddToCartMessage(`Added ${product.title} to the cart`); // Set success message
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

  useEffect(() => {
    // Set the document title to use the product's slug
    if (!loading && !error && data) {
      const product = data.getProductBySlug;
      document.title = product.slug;
    }
  }, [loading, error, data]);

  if (loading) return <LoadingBox />;
  if (error) return <MessageBox variant="danger">{error.message}</MessageBox>;

  const product = data.getProductBySlug;
  // Calculate the discounted price if applicable
  const renderPrice = () => {
    if (product.isOnSale) {
      const discountedPrice =
        (product.price * (100 - product.discountPercentage)) / 100;
      const formattedDiscountedPrice = discountedPrice.toFixed(2);
      return (
        <>
          <span className="original-price original-price-crossed">
            ${product.price}
          </span>
          &nbsp;
          <span className="discounted-price">${formattedDiscountedPrice}</span>
        </>
      );
    } else {
      return <span className="product-price">${product.price.toFixed(2)}</span>;
    }
  };

  return (
    <div className="product-page-container">
      {/* Render the product title as an h2 element */}
      <h2>{product.title}</h2>
      <Row>
        <Col md={6}>
          <Card className="img-container">
            <img className="img-large" src={product.image} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <Card className="cart-body-container">
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <Card.Text>{product.description}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item>Price: {renderPrice()}</ListGroup.Item>
                <ListGroup.Item>
                  Status:{' '}
                  <span>
                    {product.countInStock > 0 ? (
                      <Badge bg="success">In Stock</Badge>
                    ) : (
                      <Badge bg="danger">Unavailable</Badge>
                    )}
                  </span>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    {/* Add to Cart button */}
                    <Button variant="primary" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                    {/* Display the add to cart message */}
                    {addToCartMessage && (
                      <p className="add-to-cart-message">{addToCartMessage}</p>
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;

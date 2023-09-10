import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Rating from '../components/Rating';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT_BY_SLUG } from '../utils/queries';
import { Row, Col } from 'react-bootstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const ProductPage = () => {
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
  });

  useEffect(() => {
    // You can add additional logic here if needed
  }, [slug]);

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
          <Card>
            <img className="img-large" src={product.image} alt={product.name} />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
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
                    <Button variant="primary">Add to Cart</Button>
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

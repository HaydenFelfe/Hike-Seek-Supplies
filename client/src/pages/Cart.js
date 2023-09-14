import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../components/Cart.module.css';
import shoppingIcon from '../assets/images/shopping.png';
import { Link } from 'react-router-dom';
import { REMOVE_FROM_CART } from '../utils/mutations';

const Cart = () => {
  const { loading, data } = useQuery(GET_USER_CART);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_USER_CART }],
  });

  if (loading) return <p>Loading...</p>;

  if (!data || !data.getUserCart || !data.getUserCart.cart) {
    return;
  }

  const cart = data.getUserCart.cart;

  let total = 0;

  const handleRemoveItem = (itemId) => {
    removeFromCart({ variables: { productId: itemId } });
  };

  return (
    <Container className={styles['cart-container']}>
      <h3 className={styles['cart-title']}>Shopping Cart</h3>
      {cart.length === 0 ? (
        <div className={styles['empty-cart-message']}>
          Your cart is currently empty.
          <Link to="/" className={styles['go-shopping-link']}>
            <img
              src={shoppingIcon}
              alt="Shopping"
              className={styles['shopping-icon']}
            />
            Go Shopping
          </Link>
        </div>
      ) : (
        <div>
          {cart.map((item) => {
            total += item.price;
            return (
              <div key={item._id} className={styles['cart-item']}>
                <Row>
                  <Col md={2}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles['item-image']}
                    />
                  </Col>
                  <Col md={4}>
                    <p className={styles['item-title']}>{item.title}</p>
                  </Col>
                  <Col md={2}>
                    <p className={styles['item-price']}>
                      ${item.price.toFixed(2)}
                    </p>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      className={styles['remove-button']}
                      onClick={() => handleRemoveItem(item._id)} // Call the remove function with the item ID
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })}
          <div className={styles['checkout-button']}>
            <p className={styles['total-price']}>
              Total Price: ${total.toFixed(2)}
            </p>
            <Button variant="warning" className={styles['proceed-button']}>
              Proceed to Pay
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;

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
    return (
      <Container className={styles['cart-container']}>
        <h3 className={styles['cart-title']}>Shopping Cart</h3>
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
      </Container>
    );
  }

  function formatPrice(price) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return 'Invalid Price';
    }
    const centsPrice = numericPrice * 100;
  
    return centsPrice.toFixed(0);
  }

  const cart = data.getUserCart.cart;
  let total = 0;
  let totalSavings = 0; // Initialize total savings

  const handleRemoveItem = (itemId) => {
    removeFromCart({ variables: { productId: itemId } });
  };
  const handleCheckout = async () => {
    const newCart = cart.map(({ title, price, discountPercentage }) => {
      if (discountPercentage && discountPercentage > 0 && discountPercentage < 100) {
        const discountedPrice = price - (price * discountPercentage) / 100;
        return {
          name: title,
          price: formatPrice(discountedPrice),
          quantity: 1,
        };
      } else {
        return {
          name: title,
          price: formatPrice(price),
          quantity: 1,
        };
      }
    });
  
    try {
      const response = await fetch('http://localhost:3000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: newCart }),
      });
  
      if (!response.ok) {
        throw new Error('Error creating checkout session');
      }
  
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
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
            const savings =
              item.discountPercentage > 0
                ? ((item.price * item.discountPercentage) / 100).toFixed(2)
                : null;

            total +=
              item.discountPercentage > 0
                ? (item.price * (100 - item.discountPercentage)) / 100
                : item.price;

            // Add item savings to total savings
            if (item.discountPercentage > 0) {
              totalSavings += (item.price * item.discountPercentage) / 100;
            }

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
                      ${' '}
                      {item.discountPercentage > 0
                        ? (
                            (item.price * (100 - item.discountPercentage)) /
                            100
                          ).toFixed(2)
                        : item.price.toFixed(2)}
                    </p>
                    {savings && (
                      <p className={styles['savings']}>You saved: ${savings}</p>
                    )}
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      className={styles['remove-button']}
                      onClick={() => handleRemoveItem(item._id)}
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
            {totalSavings > 0 && ( // Display total savings only if there are savings
              <p className={styles['total-savings']}>
                Total Savings: ${totalSavings.toFixed(2)}
              </p>
            )}
            <Button onClick={handleCheckout} variant="warning" className={styles['proceed-button']}>
              Proceed to Pay
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
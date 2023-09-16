import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from '../components/Cart.module.css';
import shoppingIcon from '../assets/images/shopping.png';
import { Link } from 'react-router-dom';
import { REMOVE_FROM_CART, CLEAR_CART } from '../utils/mutations';
import QuantityButton from '../components/quantityButton';
import { FaTrashAlt } from 'react-icons/fa';

const Cart = () => {
  const { loading, data } = useQuery(GET_USER_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_USER_CART }],
  });
  const [clearCart] = useMutation(CLEAR_CART, {
    refetchQueries: [{ query: GET_USER_CART }],
  });

  useEffect(() => {
    document.title = 'Cart';
  }, []);

  const [quantities, setQuantities] = useState({});

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

  const cart = data.getUserCart.cart;

  let total = 0;
  let totalSavings = 0; // Initialize total savings

  const handleRemoveItem = (itemId) => {
    removeFromCart({ variables: { productId: itemId } });
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const handleClearCart = () => {
    clearCart()
      .then(() => {
        // Handle success, e.g., show a message to the user
        console.log('Cart cleared successfully.');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error clearing cart:', error);
      });
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
          <Button
            variant="danger"
            className={styles['clear-cart-button']}
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
          {cart.map((item) => {
            const itemQuantity = quantities[item._id] || 1;
            const itemPrice =
              item.discountPercentage > 0
                ? (
                    (item.price * (100 - item.discountPercentage)) /
                    100
                  ).toFixed(2)
                : item.price.toFixed(2);

            // Update the item's price based on the current quantity
            const updatedItemPrice = (itemPrice * itemQuantity).toFixed(2);

            total += parseFloat(updatedItemPrice);

            if (item.discountPercentage > 0) {
              totalSavings +=
                (item.price * item.discountPercentage * itemQuantity) / 100;
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
                    <p className={styles['item-price']}>${updatedItemPrice}</p>
                    {item.discountPercentage > 0 && (
                      <p className={styles['savings']}>
                        You saved: $
                        {(
                          (item.price *
                            item.discountPercentage *
                            itemQuantity) /
                          100
                        ).toFixed(2)}
                      </p>
                    )}
                  </Col>
                  <Col md={2}>
                    <QuantityButton
                      className={styles['quantity-button']}
                      quantity={itemQuantity}
                      onDecrease={() =>
                        handleQuantityChange(item._id, itemQuantity - 1)
                      }
                      onIncrease={() =>
                        handleQuantityChange(item._id, itemQuantity + 1)
                      }
                    />
                  </Col>
                  <Col md={2}>
                    {/* Replace the "Remove" button with the Font Awesome trash can icon */}
                    <button
                      className={styles['remove-button']}
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </Col>
                </Row>
              </div>
            );
          })}

          <div className={styles['checkout-button']}>
            <div className={styles['checkout-summary']}>
              {totalSavings > 0 && (
                <p className={styles['savings']}>
                  Total Savings: ${totalSavings.toFixed(2)}
                </p>
              )}
              <p className={styles['total-price']}>
                Total Price: ${total.toFixed(2)}
              </p>
            </div>
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

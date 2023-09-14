import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { Link } from 'react-router-dom';
import styles from '../components/Cart.module.css';
import shoppingIcon from '../assets/images/shopping.png';

const Cart = () => {
  const { loading, data } = useQuery(GET_USER_CART);

  if (loading) return <p>Loading...</p>;

  // Check if data or getUserCart is undefined or null
  if (!data || !data.getUserCart) {
    return (
      <div className={styles['cart-container']}>
        <h8 className={styles['cart-title']}>Shopping Cart</h8>
        <p className={styles['empty-cart-message']}>
          Your cart is currently empty.
        </p>
        <Link to="/" className={styles['go-shopping-link']}>
          <img
            src={shoppingIcon}
            alt="Shopping"
            className={styles['shopping-icon']}
          />
          Go Shopping
        </Link>
      </div>
    );
  }

  const cart = data.getUserCart;

  return (
    <div className={styles['cart-container']}>
      <h9 className={styles['cart-title']}>Shopping Cart</h9>
      {cart.length === 0 ? (
        <div>
          <p3 className={styles['empty-cart-message']}>
            Your cart is currently empty.
          </p3>
          <Link to="/" className={styles['shopping-link']}>
            <img
              src={shoppingIcon}
              alt="Shopping"
              className={styles['shopping-icon']} // Apply the CSS class to the img element
            />
            Go Shopping
          </Link>
        </div>
      ) : (
        <div>
          {/* Display cart items here */}
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <p4>{item.title}</p4>
              {/* Add more details about the item */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

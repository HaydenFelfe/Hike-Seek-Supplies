import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_CART } from '../utils/queries';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { loading, data } = useQuery(GET_USER_CART);

  useEffect(() => {
    document.title = 'Cart';
  }, []);

  if (loading) return <p>Loading...</p>;

  // Check if data or getUserCart is undefined or null
  if (!data || !data.getUserCart) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Go Shopping</Link>
      </div>
    );
  }

  const cart = data.getUserCart;

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div>
          {/* Display cart items here */}
          {cart.map((item) => (
            <div key={item._id}>
              <p>{item.title}</p>
              {/* Add more details about the item */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;

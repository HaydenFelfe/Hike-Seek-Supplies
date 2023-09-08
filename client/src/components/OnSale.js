import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ON_SALE_PRODUCTS } from '../utils/queries'; 

const OnSale = () => {
  // Fetch on-sale products using useQuery
  const { loading, error, data } = useQuery(GET_ON_SALE_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onSaleProducts = data.onSaleProducts; // Adjust this to match your GraphQL query structure

  return (
    <div>
      <h2>On Sale</h2>
      <ul>
        {onSaleProducts.map((product) => (
          <li key={product.productId}>
            <p>{product.title}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnSale;

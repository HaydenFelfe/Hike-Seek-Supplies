import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_HIKING_PRODUCTS } from '../utils/queries'; // You'll need to define this query

const Hiking = () => {
    const { loading, error, data } = useQuery(GET_HIKING_PRODUCTS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const hikingItems = data.getHikingItems; // Make sure to define the query on the server-side
  
    return (
      <div>
        <h2>Hiking Items</h2>
        <ul>
          {hikingItems.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>${item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Hiking;
  
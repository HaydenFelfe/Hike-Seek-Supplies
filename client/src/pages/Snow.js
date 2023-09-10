import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SNOW_PRODUCTS } from '../utils/queries'; // Replace with the appropriate query
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Snow = () => {
  const { loading, error, data } = useQuery(GET_SNOW_PRODUCTS); // Replace with the appropriate query
  const [snowItems, setSnowItems] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setSnowItems(data.getSnowProducts || []);
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Snow Items</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : snowItems && snowItems.length > 0 ? (
          snowItems.map((item) => (
            <ProductBox
              key={item._id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              rating={item.rating}
              numReviews={item.numReviews}
              slug={item.slug}
              isOnSale={item.isOnSale} // Pass the isOnSale prop
              discountPercentage={item.discountPercentage} // Pass the discountPercentage prop
            />
          ))
        ) : (
          <p>No snow items found.</p>
        )}
      </div>
    </div>
  );
};

export default Snow;

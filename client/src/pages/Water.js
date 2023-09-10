import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_WATER_PRODUCTS } from '../utils/queries'; // Replace with the appropriate query
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Water = () => {
  const { loading, error, data } = useQuery(GET_WATER_PRODUCTS); // Replace with the appropriate query
  const [waterItems, setWaterItems] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setWaterItems(data.getWaterProducts || []);
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Water Items</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : waterItems && waterItems.length > 0 ? (
          waterItems.map((item) => (
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
          <p>No water items found.</p>
        )}
      </div>
    </div>
  );
};

export default Water;

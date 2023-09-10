import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CAMPING_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Camping = () => {
  const { loading, error, data } = useQuery(GET_CAMPING_PRODUCTS);
  const [campingItems, setCampingItems] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      // Update the campingItems state when data is available
      setCampingItems(data.getCampingProducts || []);
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Camping Items</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : campingItems && campingItems.length > 0 ? (
          campingItems.map((item) => (
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
          <p>No camping items found.</p>
        )}
      </div>
    </div>
  );
};

export default Camping;

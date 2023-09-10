import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DISCOUNTED_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OnSaleNow = () => {
  const { loading, error, data } = useQuery(GET_DISCOUNTED_PRODUCTS);
  const [discountedItems, setDiscountedItems] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setDiscountedItems(data.getDiscountedProducts || []);
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Deals</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : discountedItems && discountedItems.length > 0 ? (
          discountedItems.map((item) => (
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
          <p>No discounted items found.</p>
        )}
      </div>
    </div>
  );
};

export default OnSaleNow;

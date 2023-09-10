import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_HIKING_PRODUCTS } from '../utils/queries'; // Import the appropriate query
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Hiking = () => {
  const { loading, error, data } = useQuery(GET_HIKING_PRODUCTS); // Use the appropriate query
  const [hikingItems, setHikingItems] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setHikingItems(data.getHikingProducts || []);
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Hiking Items</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : hikingItems && hikingItems.length > 0 ? (
          hikingItems.map((item) => (
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
          <p>No hiking items found.</p>
        )}
      </div>
    </div>
  );
};

export default Hiking;

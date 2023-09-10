import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USED_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const UsedEquipment = () => {
  // Change the component name to UsedEquipment
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  const [usedItems, setUsedItems] = useState([]); // Update the state name

  useEffect(() => {
    if (!loading && !error && data) {
      // Update the usedItems state when data is available
      setUsedItems(data.getUsedProducts || []); // Update the data source
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Used Items</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : usedItems && usedItems.length > 0 ? (
          usedItems.map((item) => (
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

export default UsedEquipment;

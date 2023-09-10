import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRAVEL_PRODUCTS } from '../utils/queries'; // Replace with the appropriate query
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const Travel = () => {
  const { loading, error, data } = useQuery(GET_TRAVEL_PRODUCTS); // Replace with the appropriate query
  const [travelItems, setTravelItems] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setTravelItems(data.getTravelProducts || []);
    }
  }, [loading, error, data]);

  return (
    <div>
      <h2>Travel Items</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : travelItems && travelItems.length > 0 ? (
          travelItems.map((item) => (
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
          <p>No travel items found.</p>
        )}
      </div>
    </div>
  );
};

export default Travel;

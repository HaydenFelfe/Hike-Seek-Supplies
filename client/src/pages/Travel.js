import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRAVEL_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const Travel = () => {
  const { loading, error, data } = useQuery(GET_TRAVEL_PRODUCTS);
  const [travelItems, setTravelProducts] = useState([]);
  const [sortByOption, setSortByOption] = useState('');

  useEffect(() => {
    if (!loading && !error && data) {
      setTravelProducts(data.getTravelProducts || []);
    }
  }, [loading, error, data]);

  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  useEffect(() => {
    document.title = 'Travel';
  }, []);

  return (
    <div>
      <h2>Travel Items</h2>
      <div style={{ marginLeft: '15px' }}>
        <SortBy onSortChange={handleSortChange} />
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : travelItems && travelItems.length > 0 ? (
          sortProducts(travelItems, sortByOption).map((product) => (
            <ProductBox
              key={product._id}
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
              rating={product.rating}
              numReviews={product.numReviews}
              slug={product.slug}
              isOnSale={product.isOnSale}
              discountPercentage={product.discountPercentage}
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

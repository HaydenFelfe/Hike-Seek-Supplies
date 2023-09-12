import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CAMPING_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const Camping = () => {
  const { loading, error, data } = useQuery(GET_CAMPING_PRODUCTS);
  const [campingItems, setCampingProducts] = useState([]);
  const [sortByOption, setSortByOption] = useState('');

  useEffect(() => {
    if (!loading && !error && data) {
      // Update the campingItems state when data is available
      setCampingProducts(data.getCampingProducts || []);
    }
  }, [loading, error, data]);

  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  useEffect(() => {
    document.title = 'Camping';
  }, []);

  return (
    <div>
      <h2>Camping Items</h2>
      <div style={{ marginLeft: '15px' }}>
        {' '}
        {/* Add inline style for left margin */}
        <SortBy onSortChange={handleSortChange} />{' '}
        {/* Pass handleSortChange as a callback */}
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : campingItems && campingItems.length > 0 ? (
          sortProducts(campingItems, sortByOption).map((product) => (
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
          <p>No camping items found.</p>
        )}
      </div>
    </div>
  );
};

export default Camping;

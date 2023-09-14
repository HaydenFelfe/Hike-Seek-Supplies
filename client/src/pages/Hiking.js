import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_HIKING_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const Hiking = () => {
  const { loading, error, data } = useQuery(GET_HIKING_PRODUCTS);
  const [hikingItems, setHikingProducts] = useState([]);
  const [sortByOption, setSortByOption] = useState('');

  useEffect(() => {
    if (!loading && !error && data) {
      setHikingProducts(data.getHikingProducts || []);
    }
  }, [loading, error, data]);

  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  useEffect(() => {
    document.title = 'Hiking';
  }, []);

  return (
    <div>
      <h2>Hiking Products</h2>
      <div style={{ marginLeft: '15px' }}>
        <SortBy onSortChange={handleSortChange} />
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : hikingItems && hikingItems.length > 0 ? (
          sortProducts(hikingItems, sortByOption).map((product) => (
            <ProductBox
              key={product._id}
              productId={product._id}
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
          <p>No hiking items found.</p>
        )}
      </div>
    </div>
  );
};

export default Hiking;

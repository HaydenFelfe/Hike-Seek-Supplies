import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SNOW_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const Snow = () => {
  const { loading, error, data } = useQuery(GET_SNOW_PRODUCTS);
  const [snowItems, setSnowProducts] = useState([]);
  const [sortByOption, setSortByOption] = useState('');

  useEffect(() => {
    if (!loading && !error && data) {
      setSnowProducts(data.getSnowProducts || []);
    }
  }, [loading, error, data]);

  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  useEffect(() => {
    document.title = 'Snow';
  }, []);

  return (
    <div>
      <h2>Snow Products</h2>
      <div style={{ marginLeft: '15px' }}>
        <SortBy onSortChange={handleSortChange} />
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : snowItems && snowItems.length > 0 ? (
          sortProducts(snowItems, sortByOption).map((product) => (
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
              style={{  border: '1px solid #000 !important'  }}
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

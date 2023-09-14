import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DISCOUNTED_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const OnSaleNow = () => {
  const { loading, error, data } = useQuery(GET_DISCOUNTED_PRODUCTS);
  const [discountedItems, setDiscountedItems] = useState([]);
  const [sortByOption, setSortByOption] = useState(''); // State for sorting option

  useEffect(() => {
    if (!loading && !error && data) {
      setDiscountedItems(data.getDiscountedProducts || []);
    }
  }, [loading, error, data]);

  useEffect(() => {
    document.title = 'Deals';
  }, []);

  // Function to handle sorting
  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  return (
    <div>
      <h2>Deals</h2>
      <div style={{ marginLeft: '15px' }}>
        <SortBy onSortChange={handleSortChange} />
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : discountedItems && discountedItems.length > 0 ? (
          sortProducts(discountedItems, sortByOption).map((product) => (
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
          <p>No discounted items found.</p>
        )}
      </div>
    </div>
  );
};

export default OnSaleNow;

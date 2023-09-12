import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USED_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const UsedEquipment = () => {
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  const [usedItems, setUsedItems] = useState([]);
  const [sortByOption, setSortByOption] = useState('');

  useEffect(() => {
    if (!loading && !error && data) {
      setUsedItems(data.getUsedProducts || []);
    }
  }, [loading, error, data]);

  // Function to handle sorting
  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  useEffect(() => {
    document.title = 'Used';
  }, []);

  return (
    <div>
      <h2>Used Products</h2>
      <div style={{ marginLeft: '15px' }}>
        <SortBy onSortChange={handleSortChange} />
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : usedItems && usedItems.length > 0 ? (
          sortProducts(usedItems, sortByOption).map((item) => (
            <ProductBox
              key={item._id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              rating={item.rating}
              numReviews={item.numReviews}
              slug={item.slug}
              isOnSale={item.isOnSale}
              discountPercentage={item.discountPercentage}
            />
          ))
        ) : (
          <p>No used items found.</p>
        )}
      </div>
    </div>
  );
};

export default UsedEquipment;

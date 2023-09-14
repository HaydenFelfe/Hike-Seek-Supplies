import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SortBy from '../components/SortBy';
import sortProducts from '../utils/sortUtils';

const AllProducts = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const [products, setProducts] = useState([]);
  const [sortByOption, setSortByOption] = useState('');

  useEffect(() => {
    if (!loading && !error && data) {
      setProducts(data.getAllProducts || []);
    }
  }, [loading, error, data]);

  const handleSortChange = (selectedOption) => {
    setSortByOption(selectedOption);
  };

  useEffect(() => {
    document.title = 'All Products';
  }, []);

  return (
    <div className="container-fluid">
      <h2>Featured Products</h2>
      <SortBy onSortChange={handleSortChange} />{' '}
      {/* Pass handleSortChange as a callback */}
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : products && products.length > 0 ? (
          // Sort the products based on the selected option
          sortProducts(products, sortByOption).map((product) => (
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
          <p>No products found for the all products.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../utils/queries';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      // Sort the products by numReviews in descending order
      const sortedProducts = data.getAllProducts
        .slice()
        .sort((a, b) => b.numReviews - a.numReviews);
      // Get the top 8 products
      const topProducts = sortedProducts.slice(0, 8);
      setProducts(topProducts);
    }
  }, [loading, error, data]);

  useEffect(() => {
    document.title = 'Hike & Seek Supplies';
  }, []);

  return (
    <div className="container-fluid">
      <div className="image-quote-container">
        <img
          src={process.env.PUBLIC_URL + '/images/hiking.jpg'}
          alt="Hiking Season"
        />
        <div className="quote">It's officially the hiking season!
        <div className="button-container text-center">
          <Button variant="primary" href="/hiking">
            Explore Hiking
          </Button>
        </div>
        </div>
      </div>
      <h2>Best Sellers</h2>
      <div className="row">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : products && products.length > 0 ? (
          products.map((product) => (
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
          <p>No top-rated products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

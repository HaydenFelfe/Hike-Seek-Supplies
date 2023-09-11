import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductBox from '../components/ProductBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SEARCH_PRODUCTS_QUERY } from '../utils/queries';
import { useQuery } from '@apollo/client'; // Import useQuery

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use the useQuery hook to fetch search results
  const { loading: queryLoading, error: queryError, data } = useQuery(SEARCH_PRODUCTS_QUERY, {
    variables: { query: searchQuery },
  });

  useEffect(() => {
    if (queryLoading) {
      setLoading(true);
      setError(null);
      setSearchResults([]); // Clear previous results
    } else if (queryError) {
      setLoading(false);
      setError(queryError);
      setSearchResults([]); // Clear previous results
    } else if (data) {
      setLoading(false);
      setError(null);
      setSearchResults(data.searchProducts); // Set search results from data
    }
  }, [queryLoading, queryError, data, searchQuery]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error.message}</MessageBox>
        ) : searchResults.length === 0 ? (
          <MessageBox>No results found.</MessageBox>
        ) : (
          searchResults.map((item) => (
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
        )}
      </div>
    </div>
  );
}

export default SearchResults;

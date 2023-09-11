import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client'; // Import useQuery

// Import your SEARCH_PRODUCTS_QUERY here
import { SEARCH_PRODUCTS_QUERY } from '../graphql/queries'; // Replace with the actual import path

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  // Use the useQuery hook to fetch search results
  const { loading, error, data } = useQuery(SEARCH_PRODUCTS_QUERY, {
    variables: { query: searchQuery },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const searchResults = data.searchProducts; // Adjust this based on your GraphQL query

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      <div className="products">
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {searchResults.map((item) => (
              <li key={item._id}>{item.title}</li>
              // You can display other item details here
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

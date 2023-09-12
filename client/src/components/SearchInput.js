import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Import the external CSS file
import searchIcon from '../assets/images/searchIcon.png'; 

function SearchInput() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </div>
  );
}

export default SearchInput;

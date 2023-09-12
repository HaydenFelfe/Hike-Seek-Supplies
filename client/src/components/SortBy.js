import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import './SortBy.css';

const eventKeyToText = {
  'price-asc': 'Least Expensive',
  'price-desc': 'Most Expensive',
  'rating-desc': 'Rating',
  'numReviews-desc': 'Most Reviews',
};

const SortBy = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change the threshold value to determine when the element starts moving
      if (window.scrollY > 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSortChange = (eventKey) => {
    setSelectedOption(eventKey);
    onSortChange(eventKey);
  };

  return (
    <div className={`sort-by ${isVisible ? 'scrolling' : ''}`}>
      <Form.Group controlId="sortDropdown">
        <Dropdown onSelect={handleSortChange}>
          <Dropdown.Toggle variant="primary" id="sortDropdown" className="custom-dropdown-toggle">
            {selectedOption ? (
              <span>Sort by: {eventKeyToText[selectedOption]}</span>
            ) : (
              <span>Sort by: Select Sorting Option</span>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Item eventKey="price-asc">Least Expensive</Dropdown.Item>
            <Dropdown.Item eventKey="price-desc">Most Expensive</Dropdown.Item>
            <Dropdown.Item eventKey="rating-desc">Rating</Dropdown.Item>
            <Dropdown.Item eventKey="numReviews-desc">
              Most Reviewed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
    </div>
  );
};

export default SortBy;

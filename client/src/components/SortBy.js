import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

const eventKeyToText = {
  'price-asc': 'Least Expensive',
  'price-desc': 'Most Expensive',
  'rating-desc': 'Rating',
  'numReviews-desc': 'Most Reviews',
};

const SortBy = ({ onSortChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSortChange = (eventKey) => {
    setSelectedOption(eventKey);
    onSortChange(eventKey);
  };

  return (
    <div className="sort-by">
      <Form.Group controlId="sortDropdown">
        <Dropdown onSelect={handleSortChange}>
          <Dropdown.Toggle variant="primary" id="sortDropdown">
            {selectedOption ? (
              <span>Sort by: {eventKeyToText[selectedOption]}</span>
            ) : (
              <span>Sort by: Select Sorting Option</span>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
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

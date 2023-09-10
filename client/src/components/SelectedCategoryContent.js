import React from 'react';
import Camping from '../pages/Camping'; // Import your Camping component
import Hiking from '../pages/Hiking'; // Import your Hiking component (or other category components)
import Snow from '../pages/Snow';
import Water from '../pages/Water';
import Travel from '../pages/Travel';
import Used from '../pages/Used';
import Deals from '../pages/Deals';
import './SelectedCategoryContent.css';

const SelectedCategoryContent = ({ selectedCategory }) => {
  return (
    <div className="selected-category-content">
      {/* Render the content based on the selected category */}
      {selectedCategory === 'camping' && <Camping />}
      {selectedCategory === 'hiking' && <Hiking />}
      {selectedCategory === 'snow' && <Snow />}
      {selectedCategory === 'water' && <Water />}
      {selectedCategory === 'travel' && <Travel />}
      {selectedCategory === 'used' && <Used />}
      {selectedCategory === 'deals' && <Deals />}
      {/* Add content for other categories similarly */}
    </div>
  );
};

export default SelectedCategoryContent;

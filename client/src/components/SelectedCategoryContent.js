import React from 'react';
import Camping from './Camping'; // Import your Camping component
import Hiking from './Hiking'; // Import your Hiking component (or other category components)
import Snow from './Snow';
import Water from './Water';
import Travel from './Travel';
import './SelectedCategoryContent.css'
import UsedEquipment from './UsedEquipment';

const SelectedCategoryContent = ({ selectedCategory }) => {
  return (
    <div className="selected-category-content">
      {/* Render the content based on the selected category */}
      {selectedCategory === 'camping' && <Camping />}
      {selectedCategory === 'hiking' && <Hiking />}
      {selectedCategory === 'snow' && <Snow />}
      {selectedCategory === 'water' && <Water />}
      {selectedCategory === 'travel' && <Travel />}
      {selectedCategory === 'UsedEquipment' && <UsedEquipment />}
      {/* Add content for other categories similarly */}
    </div>
  );
};

export default SelectedCategoryContent;

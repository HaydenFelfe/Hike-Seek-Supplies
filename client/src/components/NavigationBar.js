import React, { useState } from 'react';
import SelectedCategoryContent from './SelectedCategoryContent'; // Import the new component
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles['navigation-container']}>
      <div className={styles['navigation-bar']}>
        <ul className={styles['category-list']}>
          {/* Add category items with onClick handlers */}
          <li onClick={() => handleCategoryClick('camping')}>Camping</li>
          <li onClick={() => handleCategoryClick('hiking')}>Hiking</li>
          <li onClick={() => handleCategoryClick('snow')}>Snow</li>
          <li onClick={() => handleCategoryClick('water')}>Water</li>
          <li onClick={() => handleCategoryClick('travel')}>Travel</li>
          <li onClick={() => handleCategoryClick('UsedEquipment')}>Used Equipment</li>
          {/* Add other category items with similar onClick handlers */}
        </ul>
      </div>

      {/* Use the SelectedCategoryContent component to display selected category content */}
      <SelectedCategoryContent selectedCategory={selectedCategory} />
    </div>
  );
};

export default NavigationBar;

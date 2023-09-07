
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul className="category-list">
        <li><Link to="/category/camping">Camping</Link></li>
        <li><Link to="/category/hiking">Hiking</Link></li>
        <li><Link to="/category/snow">Snow</Link></li>
        <li><Link to="/category/water">Water</Link></li>
        <li><Link to="/category/travel">Travel</Link></li>
        <li><Link to="/category/used-equipment">Used Equipment</Link></li>
        <li><Link to="/category/on-sale">On Sale</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

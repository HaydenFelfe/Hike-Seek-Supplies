import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.module.css';

const NavigationBar = () => {
  return (
    <div className={styles['navigation-container']}>
      <div className={styles['navigation-bar']}>
        <ul className={styles['category-list']}>
          <li>
            <Link to="/">All</Link>
          </li>
          <li>
            <Link to="/camping">Camping</Link>
          </li>
          <li>
            <Link to="/hiking">Hiking</Link>
          </li>
          <li>
            <Link to="/snow">Snow</Link>
          </li>
          <li>
            <Link to="/water">Water</Link>
          </li>
          <li>
            <Link to="/travel">Travel</Link>
          </li>
          <li>
            <Link to="/used">Used</Link>
          </li>
          <li>
            <Link to="/deals">Deals</Link>
          </li>
          {/* Add other category links */}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;

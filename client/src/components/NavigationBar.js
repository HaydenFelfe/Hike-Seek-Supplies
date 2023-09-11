import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";


const NavigationBar = () => {
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 60;

      setIsNavbarFixed(scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fixedNavbarClass = isNavbarFixed ? styles["fixed-navigation-bar"] : "";
  return (
    <div className={`${styles["navigation-container"]} ${fixedNavbarClass}`}>
      <div className={styles["navigation-bar"]}>
        <ul className={styles["category-list"]}>
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
          {/* Include the Search component */}
         
          {/* Add other category links */}
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
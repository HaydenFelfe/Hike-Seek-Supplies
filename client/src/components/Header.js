import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Header.css'; // Import the CSS file

const Header = () => {
  const loggedIn = false; // Placeholder for user authentication state and functions
  const logout = () => {}; // Placeholder for logout function

  return (
    <header className="header"> {/* Apply the 'header' class to the header element */}
      <div className="logo-container"> {/* Apply the 'logo-container' class */}
        <Link to="/">
          <Logo className="logo" /> {/* Apply the 'logo' class */}
        </Link>
      </div>

      <input type="text" placeholder="Search" className="search-bar" />

      <div className="auth">
        {loggedIn ? (
          <>
            <Link to="/cart" className="cart">
              {/* Add cart icon or count here */}
            </Link>
            <Link to="/profile" className="profile">
              Profile
            </Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
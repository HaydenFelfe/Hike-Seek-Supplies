import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import the Button component
import Logo from './Logo';
import Search from './SearchInput';
import AuthService from '../utils/auth';
import './Header.css';

const Header = () => {
  const loggedIn = AuthService.loggedIn();

  const logout = () => {
    AuthService.logout();
    // You can also perform any other client-side cleanup here
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <Logo className="logo" />
        </Link>
      </div>

      <Search />

      <div className="auth">
        {loggedIn ? (
          <>
            <Link to="/cart">
              <Button variant="info">Cart</Button>
            </Link>
            <Button variant="info" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="info">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="info">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

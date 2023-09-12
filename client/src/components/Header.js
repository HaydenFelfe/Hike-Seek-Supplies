import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import the Button component
import Logo from './Logo';
import Search from './SearchInput';
import loginIcon from "../assets/images/login.png"
import signUpIcon from "../assets/images/signup.png"
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
               <Link to="/login" className="login-button">
              <img
                src={loginIcon}
                alt="Login"
                className="login-icon"
              />
              Login
            </Link>
            <Link to="/signup" className="signup-button">
            <img
                src={signUpIcon}
                alt="signup"
                className="signup-icon"
              />
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

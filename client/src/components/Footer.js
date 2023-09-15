import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
  <div className="footer-content">
    <div className="contact-us">
      <h3>Contact Us</h3>
      <p>
        If you have any questions or need assistance, feel free to reach out to us at:
      </p>
      <p className="contact-email">
        <a href="mailto:HikeSeekSupplies@gmail.com">HikeSeekSupplies@gmail.com</a>
      </p>
    </div>
    <div className="copyright">
      &copy; {new Date().getFullYear()} Hike Seek Supplies. All rights reserved.
    </div>
  </div>
</footer>
  );
};

export default Footer;

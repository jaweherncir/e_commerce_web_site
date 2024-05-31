import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Borgi Meuble is a leading furniture store located in Djerba, Tunisia. We specialize in providing high-quality furniture and home decor solutions to our customers.</p>
          <p>Home delivery across all of Tunisia 📦🚚</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Phone: 28712000 ☎️</p>
          <p>Address:  Djerba midoun / sfax 📍</p>
          <a href="https://www.facebook.com/MeubleBorgi.tn/?locale=fr_FR">Facebook</a>
          <a href="https://www.instagram.com/meubleborgi/?hl=en">Instagram</a>
       
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 BORGI MEUBLE. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;


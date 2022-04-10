import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        &copy;{new Date().getFullYear()} 
      </div>
      <form action="/create-checkout-session" method="POST">
      <button type="submit">Donate!</button>
    </form>
    </footer>
  );
};

export default Footer;
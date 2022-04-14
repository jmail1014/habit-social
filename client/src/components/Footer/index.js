import React from 'react';
import Button from 'react-bootstrap/Button'
const Footer = () => {

  return (
    <footer>
      <div className="container">
        &copy;{new Date().getFullYear()} 
      </div>
      <Button href="https://buy.stripe.com/test_dR64hFegSdkHgmY145" variant="success">Donate</Button>
    </footer>
  );
};

export default Footer;
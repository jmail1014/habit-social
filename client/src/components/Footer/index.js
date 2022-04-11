import React from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        &copy;{new Date().getFullYear()} 
      </div>
      <ul className="flex-row">
          <li className="mx-1">
          <Link to="/Donations">Donate!</Link>
          </li>
        </ul>
    </footer>
  );
};

export default Footer;
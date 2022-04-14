import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Navbar from "react-bootstrap/Navbar";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Navbar expand="lg" variant="dark" bg="dark">
          <Navbar.Brand href="/">
            <h1>Habit Social</h1>
          </Navbar.Brand>
        </Navbar>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile" className="btn btn-dark">
                My Habits
              </Link>
              <a href="/" className="btn btn-dark" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Login to="/login">Login</Login>
              <Register to="/register">Register</Register>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
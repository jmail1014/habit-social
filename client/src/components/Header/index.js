import React from "react";
import { Link } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header>
      <div>
        <Link to="/">
          <h1>Habit Social</h1>
        </Link>
        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">My Habits</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Login to="/login">Login</Login>
              <Register to="/register">Register</Register>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
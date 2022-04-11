import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
// import { Link } from 'react-router-dom';
// import Header from "../components/Header";

import Auth from "../utils/auth";

const Home = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default Home;

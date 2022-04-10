import React from "react";
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Home = () => {
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
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
    // <>
    // <div>
    // <h3>This is the home page</h3>
    // </div>
    // </>
  );
};

export default Home;

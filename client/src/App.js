import React from "react";

//import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

 import Home from "./pages/Home.js";
 import Login from "./pages/Login.js";
import Profile from "./pages/Profile.js";
 import Register from "./pages/Register.js";
// import UserComment from "./pages/UserComment";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
           <Header />
          <Profile /> 
           <div className="container">
            <Routes>
              <Route exact path="/" component={Home}/> 
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/profile"component = {Profile}/>
              {/* <Route exact path="/comment/:id" component={UserComment} /> */}

            </Routes>
          </div> 
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import { StoreProvider } from './utils/GlobalState';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Donations from './pages/Donations'
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
        <StoreProvider>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={Home}></Route>
              <Route path="/login" element={Login}></Route>
              <Route path="/register" element={Register}></Route>
              <Route path="/profile" element={Profile}></Route>
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path="/Donations" component={Donations} />
              <Route component={NoMatch} />
            </Routes>
          </div>
          <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React from "react";
import Navbar from 'react-bootstrap/Navbar'


const Header = () => {
  return (

  <Navbar expand="lg" variant="dark" bg="dark" >
      <Navbar.Brand href="/"><h1>Habit Social</h1></Navbar.Brand>
  </Navbar>

  );
};

export default Header;
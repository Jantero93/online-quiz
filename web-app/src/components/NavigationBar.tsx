import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';

const NavigationBar = () => {
  return (
    <NavBar className="_ColorDepth-Bg-2" expand="lg" variant="dark">
      <Container>
        <NavBar.Brand as={Link} to="/">
          Online Quiz
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="custom-calendar">
              Calendar
            </Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default NavigationBar;

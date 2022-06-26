import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';

const NavigationBar = () => {
  return (
    <NavBar className="_ColorDepth-Bg-2" expand="lg" variant="dark">
      <Container fluid>
        <NavBar.Brand as={Link} to="/">
          Online Quiz
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="NavBarScroll" />
        <NavBar.Collapse id="NavBarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="custom-calendar">
              Calendar
            </Nav.Link>
            <NavDropdown title="Online-quiz" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/quiz/play">
                Play
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/question/add">
                Add question
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="quiz/hiscores">
                Leaderboard
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav.Link className="_ColorDepth-3" as={Link} to="login">
            Login
          </Nav.Link>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default NavigationBar;

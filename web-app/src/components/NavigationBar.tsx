import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';

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
            <Nav.Link as={Link} to="quiz/play">
              Play
            </Nav.Link>
            <Nav.Link as={Link} to="question/add">
              Add question
            </Nav.Link>
            <Nav.Link as={Link} to="user/leaderboard">
              Leaderboard
            </Nav.Link>
            <Nav.Link as={Link} to="user/statistics">
              Statistics
            </Nav.Link>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default NavigationBar;

// components/Header.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <Container fluid className="bg-light py-5 text-center mb-4">
      <Row>
        <Col>
          <h1 className="display-4">Welcome to Meme Gallery</h1>
          <p className="lead">Browse our collection of funny memes</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
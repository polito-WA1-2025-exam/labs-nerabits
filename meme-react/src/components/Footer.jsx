// components/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="bg-dark text-light py-3 text-center mt-5">
      <p className="mb-0">© 2024 Meme Gallery - Created for Web Applications Lab</p>
    </Container>
  );
};

export default Footer;
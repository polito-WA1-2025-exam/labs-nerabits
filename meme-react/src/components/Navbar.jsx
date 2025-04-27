import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { CameraReelsFill } from "react-bootstrap-icons";

const MemeNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <CameraReelsFill size={28} className="me-2" />
          <span style={{ fontWeight: "700", fontSize: "1.4rem", letterSpacing: "1px" }}>
            Meme Gallery
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="text-uppercase fw-semibold">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="text-uppercase fw-semibold">
              Features
            </Nav.Link>
            <Nav.Link href="#about" className="text-uppercase fw-semibold">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MemeNavbar;

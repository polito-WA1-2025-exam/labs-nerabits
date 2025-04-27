// components/FilterBar.jsx
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const FilterBar = () => {
  return (
    <Row className="mb-4">
      <Col md={6}>
        <Form.Select aria-label="Sort memes">
          <option>Sort by...</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title (A-Z)</option>
        </Form.Select>
      </Col>
      <Col md={6} className="d-flex justify-content-end">
        <Button variant="outline-primary">All Memes</Button>
        <Button variant="outline-secondary" className="ms-2">Favorites</Button>
      </Col>
    </Row>
  );
};

export default FilterBar;
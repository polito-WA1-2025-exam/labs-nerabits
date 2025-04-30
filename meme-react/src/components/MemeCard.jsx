import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { PencilFill, HandThumbsUpFill } from 'react-bootstrap-icons';

const MemeCard = ({ meme, onEdit, onVote }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={meme.image} alt={meme.title} />
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title>{meme.title}</Card.Title>
          <Badge bg="primary" pill>{meme.score || 0} pts</Badge>
        </div>
        <Card.Text>{meme.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between align-items-center">
        <span className="text-muted">By: {meme.creator}</span>
        <div>
          <Button 
            variant="outline-success" 
            size="sm" 
            className="me-2"
            onClick={() => onVote(meme.id)}
          >
            <HandThumbsUpFill className="me-1" /> Vote
          </Button>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={() => onEdit(meme)}
          >
            <PencilFill className="me-1" /> Edit
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default MemeCard;
import React from 'react';
import { Card } from 'react-bootstrap';

const MemeCard = ({ meme }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={meme.image} alt={meme.title} />
      <Card.Body>
        <Card.Title>{meme.title}</Card.Title>
        <Card.Text>{meme.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        Created by: {meme.creator}
      </Card.Footer>
    </Card>
  );
};

export default MemeCard;

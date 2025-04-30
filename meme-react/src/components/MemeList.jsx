import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MemeCard from './MemeCard';

const MemeList = ({ memes, onEditMeme, onVoteMeme }) => {
  return (
    <Row xs={1} md={3} className="g-4">
      {memes.map(meme => (
        <Col key={meme.id}>
          <MemeCard 
            meme={meme} 
            onEdit={onEditMeme}
            onVote={onVoteMeme} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default MemeList;
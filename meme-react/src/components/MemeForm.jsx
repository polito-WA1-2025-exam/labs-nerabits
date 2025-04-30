import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function MemeForm({ meme, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [creator, setCreator] = useState('');
  const [challenge, setChallenge] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (meme) {
      setTitle(meme.title);
      setDescription(meme.description);
      setImage(meme.image);
      setCreator(meme.creator);
      setChallenge(meme.challenge);
    }
  }, [meme]);

  const validateForm = () => {
    const newErrors = [];

    if (!title.trim()) newErrors.push('Title is required.');
    if (!description.trim()) newErrors.push('Description is required.');
    if (!image.trim()) newErrors.push('Image URL is required.');
    if (!creator.trim()) newErrors.push('Creator name is required.');
    if (!challenge.trim()) newErrors.push('Challenge is required.');

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const memeData = {
      title,
      description,
      image,
      creator,
      challenge,
      date: meme ? meme.date : new Date(),
      score: meme ? meme.score : 0,
    };

    // ✅ Preserve the ID when editing
    if (meme && meme.id) {
      memeData.id = meme.id;
    }

    onSave(memeData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter meme title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a funny description"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="e.g., img/funny.jpg"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Creator</Form.Label>
        <Form.Control
          type="text"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          placeholder="Your name"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Challenge</Form.Label>
        <Form.Control
          type="text"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value)}
          placeholder="e.g., Awkward Situations"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {meme ? 'Update Meme' : 'Add Meme'}
        </Button>
      </div>
    </Form>
  );
}

export default MemeForm;

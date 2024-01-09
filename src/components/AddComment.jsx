import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'

const AddComment = ({ commento, aggiornaCommenti }) => {
  const [commentObject, setCommentObject] = useState({
    comment: '',
    rate: 1,
    elementId: commento,
  });

  const sendNewReview = async (e) => {
    e.preventDefault();

    if (commentObject.comment.length < 1) {
      alert('Il commento non può essere vuoto');
      return;
    }

    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTczNzg5YmZlMDMxZTAwMTliYTFjNzkiLCJpYXQiOjE3MDQ4MDY2OTEsImV4cCI6MTcwNjAxNjI5MX0.11C0IO75d_FrHrNyQvZQ8zCGBdJp5K401T2byD0qAzA',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commentObject),
        }
      );

      if (response.ok) {
        alert('Commento salvato!');
        aggiornaCommenti();
      // ...
      } else {
        const error = await response.json();
        console.error('Error saving comment:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form onSubmit={sendNewReview}>
      <Form.Group className="mb-1 mt-4">
        <Form.Label>Commento</Form.Label>
        <Form.Control
          type="text"
          value={commentObject.comment}
          onChange={(e) => {
            setCommentObject({ ...commentObject, comment: e.target.value, elementId: commento });
          }}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Select
          aria-label="comment rating"
          value={commentObject.rate}
          onChange={(e) => {
            setCommentObject({ ...commentObject, rate: e.target.value });
          }}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Invia
      </Button>
    </Form>
  );
};

export default AddComment;
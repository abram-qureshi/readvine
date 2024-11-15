import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${id}/`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Language: {book.language}</p>
    </div>
  );
};

export default BookDetail;
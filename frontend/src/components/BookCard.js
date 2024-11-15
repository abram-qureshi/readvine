// src/components/BookCard.js
import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img
        src={`http://localhost:8000${book.book_picture}`}
        alt={book.title}
        className="book-card-image"
      />
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Location:</strong> {book.location}</p>
        <p><strong>Availability:</strong> {book.availability}</p>
      </div>
    </div>
  );
};

export default BookCard;

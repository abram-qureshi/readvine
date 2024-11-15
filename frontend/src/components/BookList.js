// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/BookList.css';

const BookList = ({ books }) => {
  const booksPerPage = 3; // Number of books visible at one time
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("Books data fetched:", books);
  }, [books]);

  // Function to handle scroll left
  const handleScrollLeft = () => {
    setCurrentIndex((prevIndex) => {
      if (books.length === 0) return 0;
      return (prevIndex - 1 + books.length) % books.length;
    });
  };

  // Function to handle scroll right
  const handleScrollRight = () => {
    setCurrentIndex((prevIndex) => {
      if (books.length === 0) return 0;
      return (prevIndex + 1) % books.length;
    });
  };

  // Get the books to display in the current view
  const getBooksInView = () => {
    if (books.length === 0) {
      return [];
    }
    let booksInView = [];
    for (let i = 0; i < booksPerPage; i++) {
      booksInView.push(books[(currentIndex + i) % books.length]);
    }
    return booksInView;
  };

  const visibleBooks = getBooksInView();

  return (
    <div className="book-list-scroll-container">
      {/* Left Scroll Button */}
      <button
        className="scroll-button scroll-button-left"
        onClick={handleScrollLeft}
        disabled={books.length === 0}
      >
        &lt;
      </button>

      {/* Book List */}
      <div className="book-list-horizontal-container">
        <div className="book-list-horizontal">
          {visibleBooks.length > 0 ? (
            visibleBooks.map((book) => (
              <div key={book.id} className="book-card">
                <div
                  className="book-card-image"
                  style={{
                    backgroundImage: `url(http://localhost:8000${book.book_picture})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div className="book-card-overlay">
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="book-card-author">Author: {book.author}</p>
                  <Link to={`/books/${book.id}`} className="view-details-button">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </div>

      {/* Right Scroll Button */}
      <button
        className="scroll-button scroll-button-right"
        onClick={handleScrollRight}
        disabled={books.length === 0}
      >
        &gt;
      </button>
    </div>
  );
};

export default BookList;

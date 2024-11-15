// src/pages/BooksPage.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import BookList from '../components/BookList';
import BookSearch from '../components/BookSearch';
import '../styles/BooksPage.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useState({});

  useEffect(() => {
    api.get('/books', { params: searchParams })
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, [searchParams]);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className="books-page">
      <BookSearch onSearch={handleSearch} />
      <BookList books={books} />
    </div>
  );
};

export default BooksPage;

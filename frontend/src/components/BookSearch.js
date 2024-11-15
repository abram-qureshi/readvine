import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookSearch.css';
import api from '../services/api'; // Assuming you have an API utility to make HTTP calls

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('');
  const [availability, setAvailability] = useState('');
  const [location, setLocation] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nextPage, setNextPage] = useState(null);

  const navigate = useNavigate();

  // Function to handle the search operation
  const handleSearch = (url = 'books/searchBooks/') => {
    setLoading(true);
    setError('');

    api.get(url, {
      params: {
        title_author: searchTerm,
        genre,
        availability,
        location,
      },
    })
      .then((response) => {
        console.log('Search response:', response.data); // Debugging
        if (response.data && Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else if (response.data && response.data.results) {
          setSearchResults((prevResults) => [...prevResults, ...response.data.results]);
          setNextPage(response.data.next);
        } else {
          setSearchResults([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results. Please try again.');
        setSearchResults([]); // Set to empty to avoid undefined issues
        setLoading(false);
      });
  };

  // Function to handle the fetch all books operation
  const handleSearchAll = () => {
    handleSearch();
  };

  // Function to handle navigation to the book detail page
  const handleViewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  // Function to handle loading more results (pagination)
  const handleLoadMore = () => {
    if (nextPage) {
      handleSearch(nextPage);
    }
  };

  return (
    <div className="search-books-container">
      <h2 className="search-header">Search Books</h2>
      <div className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, author, or genre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="search-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Biography">Biography</option>
          <option value="Romance">Romance</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
          <option value="Historical">Historical</option>
          <option value="Self-Help">Self-Help</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Children">Children</option>
        </select>
        <select
          className="search-select"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        >
          <option value="">All Availability</option>
          <option value="Exchange">Exchange</option>
          <option value="Lend">Lend</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="search-button search-button-primary"
          onClick={() => handleSearch()}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button
          className="search-button search-button-secondary"
          onClick={handleSearchAll}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search All'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="results-container">
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          <div className="results-list">
            {searchResults.map((book) => (
              <div key={book.id} className="result-item">
                <img
                  src={`http://localhost:8000${book.book_picture}`}
                  alt={book.title}
                  className="result-image"
                />
                <div className="result-info">
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <p><strong>Location:</strong> {book.location ? book.location : 'Not specified'}</p>
                  <p><strong>Availability:</strong> {book.availability}</p>
                  <button
                    className="detail-button"
                    onClick={() => handleViewDetails(book.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="no-results-message">No results found. Try refining your search.</div>
        )}
      </div>
      {nextPage && (
        <button
          className="load-more-button"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default BookSearch;

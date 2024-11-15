import React, { useState } from 'react';

const BookSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search for books by title, author, or genre..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default BookSearchBar;

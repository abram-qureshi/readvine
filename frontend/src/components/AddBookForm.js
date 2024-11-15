import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddBookForm.css';
import api from '../utils/axios';  // Import custom API instance

const AddBookForm = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    condition: '',
    availability: '',
    bookPicture: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setBookData({
      ...bookData,
      bookPicture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    formData.append('genre', bookData.genre);
    formData.append('description', bookData.description);
    formData.append('condition', bookData.condition);
    formData.append('availability', bookData.availability);
    formData.append('bookPicture', bookData.bookPicture);

    try {
      // Use `api` instance to handle the POST request
      const response = await api.post('/books/add/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // API instance will add Authorization header automatically
        },
      });

      if (response.status === 201) {
        alert('Book added successfully!');
        navigate('/');  // Navigate to the home page after successful book addition
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  const handleHomeClick = () => {
    navigate('/'); // Navigate to the home page when the Home button is clicked
  };

  return (
    <div className="add-book-container">
      {/* Home Button - Placed outside the form for easy positioning */}
      <button type="button" className="home-button" onClick={handleHomeClick}>
        Home
      </button>

      <form className="add-book-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add a Book</h2>

        {/* Title Input */}
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Title"
            required
          />
        </div>

        {/* Author Input */}
        <div className="form-group">
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Author"
            required
          />
        </div>

        {/* Genre Selection Dropdown */}
        <div className="form-group">
          <select
            name="genre"
            value={bookData.genre}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="" disabled>Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Biography">Biography</option>
          </select>
        </div>

        {/* Description Textarea (Optional) */}
        <div className="form-group">
          <textarea
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Description (Optional)"
          />
        </div>

        {/* Condition Selection Dropdown */}
        <div className="form-group">
          <select
            name="condition"
            value={bookData.condition}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="" disabled>Select Condition</option>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Acceptable">Acceptable</option>
            <option value="Worn">Worn</option>
          </select>
        </div>

        {/* Availability Selection Dropdown */}
        <div className="form-group">
          <select
            name="availability"
            value={bookData.availability}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="" disabled>Select Availability</option>
            <option value="Exchange">Exchange</option>
            <option value="Lend">Lend</option>
          </select>
        </div>

        {/* Image Upload Field with Label */}
        <div className="form-group">
          <label htmlFor="bookPicture" className="form-label">Upload Book Picture (Required)</label>
          <input
            type="file"
            name="bookPicture"
            id="bookPicture"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;

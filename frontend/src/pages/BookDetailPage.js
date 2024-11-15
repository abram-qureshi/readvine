// src/pages/BookDetailPage.js
import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importing the AuthContext
import '../styles/BookDetailPage.css';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  
  const [editedBookData, setEditedBookData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: '',
    availability: '',
    location: '',
  });

  // Get the logged-in user username from AuthContext
  const { username } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the book details when the component loads
    api.get(`/books/${bookId}/`)
      .then(response => {
        setBook(response.data);
        setEditedBookData({
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          condition: response.data.condition,
          availability: response.data.availability,
          location: response.data.location,
        });
      })
      .catch(error => console.error('Error fetching book details:', error));
  }, [bookId]);

  // Check if the logged-in user is the owner of the book
  const isOwner = username && book && username === book.owner;

  useEffect(() => {
    // Debug ownership logic
    if (book) {
      console.log('Logged-in Username (from AuthContext):', username);
      console.log('Book Owner Username (from API):', book.owner);
      console.log('Is Owner:', isOwner);
    }
  }, [book, username]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBookData({
      ...editedBookData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleCancel = () => {
    setEditable(false);
  };

  const handleSave = async () => {
    try {
      const response = await api.put(`/books/${bookId}/`, editedBookData);
      setBook(response.data);
      setEditable(false);
      alert("Book details updated successfully!");
    } catch (error) {
      console.error('Error updating book details:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/books/${bookId}/`);
      alert("Book deleted successfully!");
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <div className="book-detail-header">
          <img 
            src={`http://localhost:8000${book.book_picture}`} 
            alt={book.title} 
            className="book-detail-image"
          />
          <div className="book-detail-info">
            {editable ? (
              <div className="book-edit-form">
                {["title", "author", "location"].map((field) => (
                  <div key={field} className="form-group">
                    <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                    <input
                      type="text"
                      name={field}
                      value={editedBookData[field]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
                <div className="form-group">
                  <label>Genre:</label>
                  <select
                    name="genre"
                    value={editedBookData.genre}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                    <option value="Horror">Horror</option>
                    <option value="Self-Help">Self-Help</option>
                    <option value="Historical">Historical</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Condition:</label>
                  <select
                    name="condition"
                    value={editedBookData.condition}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select Condition</option>
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Acceptable">Acceptable</option>
                    <option value="Worn">Worn</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Availability:</label>
                  <select
                    name="availability"
                    value={editedBookData.availability}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select Availability</option>
                    <option value="Exchange">Exchange</option>
                    <option value="Lend">Lend</option>
                  </select>
                </div>
                <button onClick={handleSave} className="btn btn-success">Save</button>
                <button onClick={handleCancel} className="btn btn-light">Cancel</button>
              </div>
            ) : (
              <>
                <h2 className="book-title">{book.title}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Condition:</strong> {book.condition}</p>
                <p><strong>Availability:</strong> {book.availability}</p>
                <p><strong>Location:</strong> {book.location || "Not specified"}</p>
                <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
                <p><strong>Date Added:</strong> {new Date(book.date_added).toLocaleDateString()}</p>
                
                {/* Only show Edit/Delete buttons if user is the owner */}
                {isOwner && (
                  <div className="book-actions">
                    <button onClick={handleEdit} className="btn btn-primary">Edit</button>
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;

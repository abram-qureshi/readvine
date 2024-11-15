// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList'; // Updated import for BookList
import { FaSearch } from 'react-icons/fa'; // Importing search icon

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    email: '',
    first_name: '',
    last_name: '',
    profile_picture: null,
    bio: '',
    location: '',
    phone_number: '',
    dob: '',
  });
  const [books, setBooks] = useState([]);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile
    api.get('/users/profile/')
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => console.error('Error fetching profile:', error));

    // Fetch user's books
    api.get('/books/userbooks/') // Corrected to match backend route
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.error('Error fetching books:', error));

    // Add a unique class to the body for the profile page
    document.body.classList.add('profile-page-body');

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove('profile-page-body');
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = () => {
    api.put('/users/profile/', profile)
      .then(response => {
        setProfile(response.data);
        setEditable(false);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    api.post('/users/logout/', { refresh_token: refreshToken })
      .then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      })
      .catch(error => console.error('Error logging out:', error));
  };

  // Function to navigate to the Add Book Page
  const handleAddBookClick = () => {
    navigate('/add-book');
  };

  // Function to navigate to the Search Books Page
  const handleSearchBooksClick = () => {
    navigate('/searchBooks'); // Navigate to the book search page
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>My Profile</h2>
        <div className="profile-actions">
          {/* Search Button with Icon */}
          <button onClick={handleSearchBooksClick} className="btn btn-secondary search-button">
            <FaSearch className="search-icon" /> Search Books
          </button>
          <button onClick={() => setEditable(true)} className="btn btn-primary">Edit Profile</button>
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
      </div>
      <div className="profile-container">
        {editable ? (
          <form className="profile-edit-form">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={profile.phone_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSaveProfile} type="button" className="btn btn-success">Save</button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>First Name:</strong> {profile.first_name}</p>
            <p><strong>Last Name:</strong> {profile.last_name}</p>
            <p><strong>Phone Number:</strong> {profile.phone_number}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </div>
        )}
      </div>
      <div className="my-books-section">
        <h2>My Listings</h2>
        <BookList books={books} />
      </div>
      <div className="add-book-button-container">
        <button onClick={handleAddBookClick} className="btn btn-primary">
          Add New Book
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

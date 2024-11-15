// src/components/Profile.js

import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import api from '../utils/axios'; // Replace 'axios' with 'api'
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [user, setUser] = useState(null); // State to hold user data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // State for error messages
    const [isEditing, setIsEditing] = useState(false); // Toggle for editing mode
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        location: '',
        bio: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage
            
            console.log('Token:', token); // Log the token for debugging
            
            if (!token) {
                setError('No token found, please log in.');
                setLoading(false);
                return;
            }

            try {
                const response = await api.get('http://127.0.0.1:8000/users/api/profile/', {
                    headers: { Authorization: `Token ${token}` },
                });
                // Check the response here
                console.log('User Profile Response:', response.data); // Log the response
                setUser(response.data);
                setFormData(response.data);
            } catch (err) {
                console.error('Failed to fetch user data:', err); // Log the error
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false); // Set loading to false when done
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Update form data
    };

    const handleEdit = () => {
        setIsEditing(true); // Enable editing mode
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Get token for authorization
        try {
            await axios.put('http://127.0.0.1:8000/users/api/profile/update/', formData, {
                headers: { Authorization: `Token ${token}` }, // Send token for authorization
            });
            setUser(formData); // Update local user state
            setIsEditing(false); // Disable editing mode
        } catch (error) {
            console.error('Error saving profile data:', error); // Log the error
            setError('Error saving profile data.'); // Handle save errors
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token from local storage
        window.location.href = '/login'; // Redirect to login page
    };

    // Handle loading and error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center">Profile</h2>
            <div className="card shadow-sm p-4">
                <h5>User Profile Details:</h5>
                <form onSubmit={handleSave}>
                    <div className="mb-3">
                        <strong>Username:</strong> {isEditing ? (
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            user.username
                        )}
                    </div>
                    <div className="mb-3">
                        <strong>Email:</strong> {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            user.email
                        )}
                    </div>
                    <div className="mb-3">
                        <strong>Full Name:</strong> {isEditing ? (
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            user.full_name
                        )}
                    </div>
                    <div className="mb-3">
                        <strong>Location:</strong> {isEditing ? (
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            user.location
                        )}
                    </div>
                    <div className="mb-3">
                        <strong>Bio:</strong> {isEditing ? (
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            user.bio
                        )}
                    </div>
                    {isEditing ? (
                        <button className="btn btn-success" type="submit">Save Changes</button>
                    ) : (
                        <button className="btn btn-primary" type="button" onClick={handleEdit}>Edit Profile</button>
                    )}
                </form>
                <button 
                    className="btn btn-danger mt-3" 
                    onClick={handleLogout}  // Call handleLogout on button click
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

export function Navbar({ setFilteredCreator }) {
  const [creatorOptions, setCreatorOptions] = useState([]);

  useEffect(() => {
    const fetchCreatorOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/routes"); // Adjust the endpoint URL accordingly
        const creators = response.data.map(post => post.created_by);
        const uniqueCreators = [...new Set(creators)];
        setCreatorOptions(uniqueCreators);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCreatorOptions();
  }, []);

  const handleCreatorSelect = (event) => {
    const selectedCreator = event.target.value;
    setFilteredCreator(selectedCreator); // Pass the selected creator to the parent component
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
        <h1>Movie Recommendation</h1>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-post">Add Post</Link></li>
        <li><Link to="/update-post">Update Post</Link></li>
        <li><Link to="/delete-post">Delete Post</Link></li>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/signup">signup</Link></li>
        <li>
          <select onChange={handleCreatorSelect}>
            <option value="">All</option>
            {creatorOptions.map((creator, index) => (
              <option key={index} value={creator}>{creator}</option>
            ))}
          </select>
        </li>
      </ul>
    </nav>
  );
}

// Prop types validation
Navbar.propTypes = {
  setFilteredCreator: PropTypes.func.isRequired,
};

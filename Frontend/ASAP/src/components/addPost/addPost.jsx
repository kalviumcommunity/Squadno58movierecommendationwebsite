import React, { useState } from "react";
import axios from "axios";

export function AddPost() {
  const [formData, setFormData] = useState({
    ID: "",
    poster: "",
    movieName: "",
    ratings: "",
    rottenTomatoes: "",
    releaseYear: "",
    created_by: "" // Changed from "created by" to "created_by"
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/routes/Create", formData);
      setSubmitMessage("Submission successful!");
      setFormData({
        ID: "",
        poster: "",
        movieName: "",
        ratings: "",
        rottenTomatoes: "",
        releaseYear: "",
        created_by: "" // Ensure consistency
      });
      setTimeout(() => {
        setSubmitMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <h2>Submit New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Poster:</label>
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Movie Name:</label>
          <input
            type="text"
            name="movieName"
            value={formData.movieName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ratings:</label>
          <input
            type="text"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rotten Tomatoes:</label>
          <input
            type="text"
            name="rottenTomatoes"
            value={formData.rottenTomatoes}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Release Year:</label>
          <input
            type="text"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>created by:</label>
          <input
            type="text"
            name="created_by" // Changed from "created by" to "created_by"
            value={formData.created_by}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

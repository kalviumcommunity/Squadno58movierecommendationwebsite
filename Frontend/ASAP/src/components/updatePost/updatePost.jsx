import React, { useState, useEffect } from "react";
import axios from "axios";

export function UpdatePost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("ID");
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
        ID: "",
        poster: "",
        movieName: "",
        ratings: "",
        rottenTomatoes: "",
        releaseYear: "",
        created_by: ""
  });
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/routes");
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateClick = (post) => {
    setFormData(post);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.movieName || !formData.ratings) {
      setSubmitMessage("Please fill in all fields.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:3000/routes/Update/${formData.ID}`,
        formData
      );
      setSubmitMessage("Post updated successfully!");
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Update failed:", error);
      setSubmitMessage("An error occurred while updating the post.");
    }
  };

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle search
  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
    const query = Number.isNaN(parseInt(searchQuery)) ? searchQuery : parseInt(searchQuery);
    const post = searchResults.find((post) => post.ID === query);
    console.log("Found Post:", post);
    if (post) {
      setSearchResults([post]);
      setSubmitMessage(""); 
    } else {
      setSearchResults([]);
      setSubmitMessage("Post not found.");
    }
  };

  return (
    <div>
      <h2>Search for Post to Update</h2>
      <div>
        <select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="ID">ID</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchOption}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <div key={post._id}>
              <p>ID: {post.ID}</p>
              <img src={post.poster} alt="" />
              <h3>movieName: {post.movieName}</h3>
              <h3>ratings: {post.ratings}</h3>
              <h3>rottenTomatoes: {post.rottenTomatoes}</h3>
              <h3>releaseYear: {post.releaseYear}</h3>
              <h3>created_by: {post.created_by}</h3>
              <button onClick={() => handleUpdateClick(post)}>Update</button>
            </div>
          ))
        ) : (
          <p>No matching posts found.</p>
        )}
      </div>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="movieName"
          value={formData.movieName}
          placeholder="Movie Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ratings"
          value={formData.ratings}
          placeholder="Ratings"
          onChange={handleChange}
        />
        <input
          type="text"
          name="poster"
          value={formData.poster}
          placeholder="Poster"
          onChange={handleChange}
        />
        <input
          type="text"
          name="rottenTomatoes"
          value={formData.rottenTomatoes}
          placeholder="Rotten Tomatoes"
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseYear"
          value={formData.releaseYear}
          placeholder="Release Year"
          onChange={handleChange}
        />
        <div>
          <label>created by:</label>
          <input
            type="text"
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

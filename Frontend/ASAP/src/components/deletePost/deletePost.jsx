import React, { useState, useEffect } from "react";
import axios from "axios";
// Added functionality to delete a post
export function DeletePost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("ID");
  const [searchResults, setSearchResults] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Fetch all posts and store them in an object format
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/routes");
        const postsObject = {};
        response.data.forEach((post) => {
          postsObject[post.ID] = post;
        });
        setSearchResults(postsObject);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    // Search for the post by ID
    const post = searchResults[searchQuery];
    if (post) {
      setSearchResults({ [searchQuery]: post });
    } else {
      setSearchResults({});
      setSubmitMessage("Post not found.");
    }
  };

  const handleDelete = async (postId) => {
    try {
      // Send a request to delete the post with the provided ID
      const response = await axios.delete(`http://localhost:3000/routes/Delete/${postId}`);
      
      // Handle the response
      setSubmitMessage(response.data.message);
    } catch (error) {
      console.error("Delete failed:", error);
      setSubmitMessage("An error occurred while deleting the post.");
    }
  };

  return (
    <div>
      <h2>Search for Post to Delete</h2>
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
        {Object.keys(searchResults).length > 0 ? (
          Object.values(searchResults).map((post) => (
            <div key={post.ID}>
              <p>ID: {post.ID}</p>
              <p>poster: {post.poster}</p>
              <p>movieName: {post.movieName}</p>
              <p>ratings: {post.ratings}</p>
              <p>rottenTomatoes: {post.rottenTomatoes}</p>
              <p>releaseYear: {post.releaseYear}</p>
              <button onClick={() => handleDelete(post.ID)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No matching posts found.</p>
        )}
      </div>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

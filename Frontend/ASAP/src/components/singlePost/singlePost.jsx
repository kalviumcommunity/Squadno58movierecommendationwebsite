import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function SinglePost() {
  const { id } = useParams();
  const [posts, setPosts] = useState({});
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/routes");
        setPosts(response.data.reduce((acc, curr) => {
          acc[curr.ID] = curr;
          return acc;
        }, {}));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id && posts[id]) {
      setPost(posts[id]);
    } else {
      setPost(null);
    }
  }, [id, posts]);

  return (
    <div>
      {post ? (
        <div className="entity-card">
          <h2>{post.ID}</h2>
          <img src={post.poster} alt="person" />
          <h3>Movie Name: {post.movieName}</h3>
          <h3>Rating: {post.ratings}</h3>
          <h3>Rotten Tomatoes: {post.rottenTomatoes}</h3>
          <h3>Release Year: {post.releaseYear}</h3>
          <h3>Created By: {post.created_by}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export function Home({ filteredCreator }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/routes");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const filteredData = filteredCreator ? data.filter(post => post.created_by === filteredCreator) : data;


  return (
    <div className="container">
      <div className="entity-container">
        {filteredData &&
          filteredData.map((post) => (
            <div key={post.ID} className="entity-card">
              <h2>{post.ID}</h2>
              <img src={post.poster} alt="person" />
              <h3>movieName: {post.movieName}</h3>
              <h3>ratings: {post.ratings}</h3>
              <h3>rottenTomatoes: {post.rottenTomatoes}</h3>
              <h3>releaseYear: {post.releaseYear}</h3>
              <h3>created_by: {post.created_by}</h3>
              <Link to={`/post/${post.ID}`}>View Post</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

Home.propTypes = {
  filteredCreator: PropTypes.string,
};

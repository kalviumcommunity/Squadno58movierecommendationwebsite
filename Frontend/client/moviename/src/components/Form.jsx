import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import { Link } from 'react-router-dom';

function Form() {
  const [Name, setName] = useState("");
  const [Poster_Link, setPoster_Link] = useState("");
  const [Ratings, setRatings] = useState("");
  const [Release_Year, setRelease_Year] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: Name,
      Poster_Link: Poster_Link,
      Ratings: Ratings,
      Release_Year: Release_Year
    };

    fetch('http://localhost:7007/Post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => { console.log(data);
        alert("Data posted successfully");
        navigate('/');
      }
    )
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Movie Name:</label>
        <input type="text" id="Name" name="Name" value={Name} onChange={e => setName(e.target.value)} />
        <label>Image:</label>
        <input type="text" id="Poster_Link" name="Poster_Link" value={Poster_Link} onChange={e => setPoster_Link(e.target.value)} />
        <label>Ratings</label>
        <input type="text" id="Ratings" name="Ratings" value={Ratings} onChange={e => setRatings(e.target.value)} />
        <label>Release_Year</label>
        <input type="text" id="Release_Year" name="Release_Year" value={Release_Year} onChange={e => setRelease_Year(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
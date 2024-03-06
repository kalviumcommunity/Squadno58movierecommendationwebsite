import React, { useEffect, useState } from 'react';

const MovieRecommendationForm = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  async function fetchData(){
    try {
      const response = await fetch(`http://localhost:7007/routes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  console.log(recommendations)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Title:
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </label>
        <button type="submit">Get Recommendations</button>
      </form>
      <div>
        {recommendations?.map((recommendation, index) => {
          return (
          <div key={index}>
            <p>{recommendation.Name}</p>
            <img src={recommendation.Poster_Link}/>
            <p>{recommendation.Ratings}</p>
          </div>)}
        )}
      </div>
    </div>
  );
};

export default MovieRecommendationForm;

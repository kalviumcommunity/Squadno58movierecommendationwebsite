import { useEffect, useState } from 'react';
import Home from './components/Home';
import './App.css';
import {Route, Routes } from 'react-router-dom';

const MovieRecommendationForm = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [data, setData] = useState(0);

function fetchData(){
      fetch(`http://localhost:7007/routes`)
      .then(res=> res.json())
      .then(res=>{
       setData(res);
      })
      .catch(err=>{
       console.log(err);
      })
 }
    

  

  useEffect(()=>{
    fetchData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  console.log(recommendations)

  return (
    <>
    <Routes>  
        <Route path="/" element={<Home data={data} setData={setData}/>}></Route>
        </Routes>
  
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
    </>
  );
};

export default MovieRecommendationForm;

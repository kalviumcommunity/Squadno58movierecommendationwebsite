import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home(props){

    const navigate = useNavigate();
    const {data}=props
    return(
        <div className='container'>
            <div className="entity-container">
                {data &&
                 data.map((e, index) => (
                    <div key={index} className="entity-card">
              <h2>{e.Name}</h2>
              <img id="img-src" src={e.Poster_Link} alt="person" />
              
              <h3>Ratings:{e.Ratings}</h3>
              <h3>Release_Year:{e.Release_Year}</h3>
              
                </div>

                 ))

                }
            </div>
        </div>
    
    )
}
export default Home;
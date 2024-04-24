import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        try {
          const response = fetch(`http://localhost:8009/routes/DELETE/${id}`, {
            method: 'DELETE'
          });

        //   setFlag(!flag)
        } catch (error) {
          console.error('Error deleting entity:', error);
        }
      };
    
      const handleUpdate = (e) => {
        let id = e._id;
        navigate(`/update_data/${id}`);
      };

    useEffect(() => {
        fetch(`http://localhost:8009/routes`)
            .then(res => res.json())
            .then((res) => {
                setData(res);
                console.log(res);
            }).catch((err) => console.log(err))
    }, [handleDelete,handleUpdate])

    return (
        <>
            <nav>
                <div></div>
                <div className='nav-item'>
                    <span>Home</span>
                    <Link to="/add">Add</Link>
                    
                    <span>contact</span>
                </div>
            </nav>
            <div className='parent-div'>
                <div className='child-div'>
                    {data && data.map((item, index) => (    
                        <div className='card' key={index}>
                            <h1>{item.Name}</h1>
                            <img src={item.Poster_Link} alt="" />
                            <p>{item.Ratings}</p>
                            <p>{item.Release_Year}</p>
                            <button className='edit' onClick={() => handleUpdate(item)}>Update</button>
                            <button className='dlt' onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                        
    ))
    
                }
                </div>
            </div>

        </>

    )
}
export default Home;
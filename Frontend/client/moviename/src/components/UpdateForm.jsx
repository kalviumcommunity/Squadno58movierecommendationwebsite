import React from 'react'
import { useParams } from 'react-router-dom';
// import { link } from '../../../../../Backend/routes/routes';

const UpdateForm = () => {

    const  [name, setName] = React.useState('');
    const [image, setImage] = React.useState('');
    const  [number, setNumber] = React.useState('');
    const  [releaseyear, setReleaseyear] = React.useState('');

    const params=useParams();
    let id=params.id;
    
    function handleName(e){
     setName(e.target.value)
    }
 
    function handleImage(e){
     setImage(e.target.value)
    }

    function handleNumber(e){
        setNumber(e.target.value)
       }

    function handleReleaseyear(e){
        setReleaseyear(e.target.value)
    }

    const handleSubmit=(e)=>{

        e.preventDefault();

        const data={
            Name:name,
            Poster_Link:image,
            Ratings:number,
            Release_Year:releaseyear,
           }

        fetch(`http://localhost:8009/routes/Update/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
      

    }

  return (
    <form onSubmit={handleSubmit}>
                
        <input onChange={handleName} type="text" placeholder='MovieName'/>
        <input onChange={handleImage} type="text" placeholder=' PosterLink'/>
        <input onChange={handleNumber} type="number" placeholder='ratings'/>
        <input onChange={handleReleaseyear} type="number" placeholder='release year'/>
        

        <button type="submit" >Update Entity</button>

    </form>
  )
}

export default UpdateForm
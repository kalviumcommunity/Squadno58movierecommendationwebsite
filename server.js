const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config()
const port = process.env.PUBLIC_PORT || 3000;
const {connection}=require('./config/db')
const moviesData= require('./config/database');
const { moviesModel } = require('./model/movies');


app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/postdata',(req,res)=>{
  moviesModel.insertMany(moviesData)
  .then((result) => {
    console.log('Inserted', result.length, 'documents into the collection');
  })
  .catch((error) => {
    console.error('Error inserting documents:', error);
  });
})


app.listen(port,async () => { 
  try {
    await connection;
    console.log("Connected to DB successfully")
    
  } catch (error) {
     console.log("Error connecting to DB");
     console.log(error);
  }


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
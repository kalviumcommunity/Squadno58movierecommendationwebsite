const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config()
const port = process.env.PUBLIC_PORT || 3000;
const {connection,isConnected}=require('./config/db')
const moviesData = require('./config/data');
const { moviesModel } = require('./model/movies');
const CRUD_routes = require('./routes/routes');
const cors=require('cors')

app.use(express.json())
app.use(cors())

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.get("/", async (req, res) => {

  if(isConnected()){
    res.status(200).send(`<h1>Database Connected Successfully</h1><p>Status Code: 200</p>`);
  }else{
    res.status(400).send(`<h1>Database is not Connected Successfully</h1><p>Status Code: 400</p>`);
  }
  
  // res.status(200).send(`<h1>Database Connected Successfully</h1><p>Status Code: 200</p>`);
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

app.use("/routes",CRUD_routes)

app.listen(port,async () => { 
  try {
    await connection;
    console.log("Connected to DB successfully")
    
  } catch (error) {
     console.log("Error connecting to DB");
     console.log(error);
  }

  console.log(`Server is listening on port ${port}`);

  

});
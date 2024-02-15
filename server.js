const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config()
const port = process.env.PUBLIC_PORT || 3000; 


app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
const mongoose = require('mongoose');
require("dotenv").config()
const connection=mongoose.connect(process.env.MONGO_URL)

const isConnected = () => {
    return mongoose.connection.readyState === 1;
  }

module.exports={connection,isConnected}

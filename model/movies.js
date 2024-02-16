const mongoose=require('mongoose')
const moviesSchema=mongoose.Schema({

    Serial_Number:Number,
    Name: String,
    Ratings: String,
    Rotten_Tomatoes: String,
    Release_Year: String,
    Poster_Link: String
})
const moviesModel= mongoose.model("movie",moviesSchema)

module.exports={moviesModel}

const mongoose = require("mongoose");
const moodScapeSchema = new mongoose.Schema({
    ID:{type:Number, unique:true, required:true},
    poster: { type: String, required: true  },
    movieName: { type: String, required: true  },
    ratings: { type: String, required: true  },
    rottenTomatoes: { type: String, required: true  },
    releaseYear: { type: String, required: true  },
    created_by:{type: String, required: true },
});
const moviesModel = mongoose.model('movies', moodScapeSchema); 
module.exports = { moviesModel };

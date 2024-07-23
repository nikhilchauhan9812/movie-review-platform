const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movie_id: {
    type: String,
    required: true,
    unique: true,
  },
  movie_name: {
    type: String,
    required: true,
  },
  movie_image: {
    type: String,
    required: true,
  },
});

mongoose.model("Movie", movieSchema);

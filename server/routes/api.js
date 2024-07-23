const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Movie = mongoose.model("Movie");
const UserData = mongoose.model("UserData");
const requireLogin = require("../middleware/protected");


router.get('/movies/allfavourites', requireLogin, (req, res) => {
  UserData.findById(req.user._id)
    .populate('favourite') // Populates the favourite field with movie details
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: "User not found." });
      } else {
        return res.json({ favourites: user.favourite });
      }
    })
    .catch(err => console.log(err));
});

router.post("/movies/favourite", requireLogin, async (req, res) => {
  const { movie_id, movie_name, movie_image } = req.body;

  if (!movie_id || !movie_name || !movie_image) {
    return res
      .status(422)
      .json({ error: "Please provide all required movie details" });
  }

  try {
    let movie = await Movie.findOne({ movie_id });
    if (!movie) {
      movie = new Movie({
        movie_id,
        movie_name,
        movie_image,
      });
      await movie.save();
    }

    const user = req.user;

    if (!user.favourite.includes(movie._id)) {
      user.favourite.push(movie._id);
      await user.save();
    }

    res.json({ message: "Movie added to favourites successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.delete("/movies/unfavourite", requireLogin, async (req, res) => {
  const { movie_id } = req.body;

  if (!movie_id) {
    return res.status(422).json({ error: "Movie ID is required" });
  }

  try {
    const movie = await Movie.findOneAndDelete({ movie_id });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const user = req.user;
    const index = user.favourite.indexOf(movie._id);
    if (index > -1) {
      user.favourite.splice(index, 1);
      await user.save();
    }

    res.status(200).json({ message: "This is no more your favourite!" });
  } catch (error) {
    console.log("Error occurred in deleting:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});




module.exports = router;

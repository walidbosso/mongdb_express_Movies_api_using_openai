const mongoose = require("mongoose");
const editMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");
  //take relevant data from the client's request
  const { movie_id, movie_name, info, rating } = req.body;

  //validations

  if (!movie_id) throw "id is required";

  //update

  //because of await
  await moviesModel.updateOne(
    {
      //we search for this one
      _id: movie_id, //_id attribut from MongoDB
    },
    {
      //when we find movie id, we update
      movie_name: movie_name,
      info: info,
      rating: rating,
    },
    {
      runValidators: true, // so that it activates the required that exist in Model's schema
      //if we send an empty string in PATCH body, e.message of catch will be called
      //with that msg in schema
      //if not the catch wont be activated, and it will update the movie name with an empty string, we dont want that
    }
  );
  res.status(200).json({
    status: "success",
    message: "movie got updated!",
  });
};

module.exports = editMovie;

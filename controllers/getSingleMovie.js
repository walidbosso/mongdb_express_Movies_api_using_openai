const mongoose = require("mongoose");
const getSingleMovie = async (req, res) => {
  //import model
  const moviesModel = mongoose.model("movies");
  //retrieve data

  const moviesData = await moviesModel.findOne({
    _id: req.params.movie_id,
    // f MongoDB howa li ki creer w ki generer id,
    //w howa li semmaha _id
  });
  res.status(200).json({
    status: "success",
    //param: req.params,
    //id: req.params.movie_id,
    data: moviesData,
  });
};
module.exports = getSingleMovie;

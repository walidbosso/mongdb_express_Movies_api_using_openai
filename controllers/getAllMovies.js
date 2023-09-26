const mongoose = require("mongoose");
const getAllMovies = async (req, res) => {
  //import model
  const moviesModel = mongoose.model("movies");
  //retrieve data

  const moviesData = await moviesModel.find({});
  res.status(200).json({
    status: "success",
    data: moviesData,
  });
};
module.exports = getAllMovies;

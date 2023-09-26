const mongoose = require("mongoose");

const deleteMovie = async (req, res) => {
  const moviesModel = mongoose.model("movies");

  const movie_id = req.params.movie_id;
  //validation
  const getMovie = await moviesModel.findOne({
    // don't FORGET AWAIT
    _id: movie_id,
  });
  // try {
  if (!getMovie) throw "No movie with such id exist in DB";
  /* } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
    return; //always after catch specially in validations, always!! because of re.send should not be sent twice
  }*/
  // try {
  // await is necessary!!
  //console.log(req.params.movie_id);
  await moviesModel.deleteOne({
    _id: movie_id,
  });
  /* } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }*/
  res.status(200).json({
    status: "success",
    message: "delete successful",
  });
};

module.exports = deleteMovie;

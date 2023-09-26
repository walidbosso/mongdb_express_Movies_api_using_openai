const mongoose = require("mongoose");

const addMovie = async (req, res) => {
  //function and two parameters
  //console.log(req.url);
  //console.log(req.body);

  //To add data, import the models, make sure it matches the name of file in models folder
  const moviesModel = mongoose.model("movies");

  //we want only relevant info that exist in model schema
  //= deconstruct
  const { movie_name, info, rating } = req.body;

  //VALIDATION
  //no name, info, rating, and 1-10

  //if (!movie_name) throw "Name is required!"; // hadi emlnaha f west schema ida makynchi name rah emlnala msg diala tmak
  if (!info) throw "info must be provided";
  if (!rating) throw "Rating must be provided";
  if (rating < 1 || rating > 10) throw "Rating must be between 1 and 10";

  //SUCCESS, only show when all alright

  const createMovie = await moviesModel.create({
    //add async in model signature
    //only the attributs you have in model
    //if you add something that doesn't exist in model schema it won't be added
    //you must add the new attribut on schema, then it will work
    //and will be added to MongoDB
    movie_name: movie_name,
    info: info,
    rating: rating,
  });
  console.log(createMovie);
  /*} catch (e) {
    res.status(400).json({
      //400 means BAD request in http code

      status: "failed",
      message: e.message, //"Movie c reation failed, something went wrong",
    });
  }*/
  // Without getting the response from create, 200 will not be executed and returned.
  res.status(200).json({
    //we are inside json object now
    //200 means if request is successfuly received

    status: "success",
    message: "Movie added successfulyy",
    // movie_name: movie_name,
    //info: info,
    //rating: rating,
  });
};
module.exports = addMovie;
//by exporting, what we are doing is we are making this file available for another files

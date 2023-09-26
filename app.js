require("express-async-errors");
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const addMovie = require("./controllers/addMovie");
const getAllMovies = require("./controllers/getAllMovies");
const getSingleMovie = require("./controllers/getSingleMovie");
const editMovie = require("./controllers/editMovie");
const deleteMovie = require("./controllers/deleteMovie");
const movieRecommendation = require("./controllers/movieRecommendation");
const errorHandler = require("./handlers/errorHandler");

//Connection to MDB DB
mongoose
  .connect(process.env.mongo_connection, {}) //process.env.variableInsideenv
  .then(() => {
    console.log("Connection to MongoDB successfull!!");
  })
  .catch(() => {
    console.log(
      process.env.mongo_connection + " Connection to MongoDB failed!!"
    );
  });

const app = express(); //it doesn't access json body
//Express reads json, to access body, default is xml
app.use(express.json());

//Import Models + it created DB in ATLAS when you added the name in .env
require("./models/movies.model");

//Routes
//ADD
//V1 Works!!
//app.post("/api/movies",  => {
//res.status(200).json({
//status: "this is add a mov(req, res)ie route",
//});
//});

//V2 Doesn't work
//app.post("api/movies", addMovie);

//Add, V3 is ideal
app.post(
  "/api/movies",
  addMovie // Call the function here
);
//GetAll (hover over the controller, ctrl+space+click to import it)
app.get("/api/movies", getAllMovies);
//GetOne
app.get("/api/movies/:movie_id", getSingleMovie);
//Edit/update
app.patch("/api/movies", editMovie);
//delete
app.delete("/api/movies/:movie_id", deleteMovie);

//Openai Suggestions
app.get("/api/movies/openai/getRecommendation", movieRecommendation);

//errorhandler under routes
app.use(errorHandler);

//Server listenening
app.listen(8000, () => {
  console.log("server listening!");
});

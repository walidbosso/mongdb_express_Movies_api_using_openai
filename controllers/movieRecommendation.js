const { Configuration, OpenAIApi } = require("openai");
const mongoose = require("mongoose");

const movieRecommendation = async (req, res) => {
  //async khask tzida byedk f npm jat bla biha
  const moviesModel = mongoose.model("movies");

  const allMovies = await moviesModel.find({}); // all movies from MongoDB
  //console.log(allMovies)

  const moviesString = allMovies.map((el) => el.movie_name).join(","); // for each el (element), ki eti array, .join ki eti string, ghatji Matalan nemo, batman, etc, an qasiw openai yeetina aflam based elihom, andemjoha f msg li ntaht g
  const prompt = `I need a movie recommendation based on these movies : ${moviesString}. Provide me with 10 suggestions! seperate movies with comma`;
  console.log(prompt);

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // khassk tzida .env API key from openai platform
  });
  const openai = new OpenAIApi(configuration);

  try {
    // drr hit kayen await, w aslan Matalan la model maemltichi 003 emlti chi raqm mbedl app ghay crashi wiywqaf, khess nn neemlo catch n affichiwha f POSTMAN status(400)

    //HADI HIA OPENAI LKHEDMA DIALA: faqat kteb li khessek f prompt!!
    const completion = await openai.createCompletion({
      //completion var hia li n affichiw f status(200)
      model: "text-davinci-003",
      prompt: prompt, // pedel had prompt kif bghiti!! Hada howa chatGPT
      max_tokens: 100, // la ma etetiloshi hadi ghay etik response short ! makikmlchi !! GHAY ETIK GHA JOJ ? DB B 100 GHAY ETIK 10
    });

    res.status(200).json({
      suggestions: completion.data.choices[0].text, // L RESULTAT DIAL OPENAI HIA COMPLETION!! Ghatban f POSTMAN MELLI TEEML SEND!
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: "Couldnot get recommendations",
    });
    return;
  }
};

module.exports = movieRecommendation;

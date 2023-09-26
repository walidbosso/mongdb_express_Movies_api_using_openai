const errorHandler = (error, req, res, next) => {
  if (error) {
    // console.log(error); // you should be able to see whole error as a back-end
    if (error.message) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: error,
      });
    }
    return; // this is necessary!
  } else {
    next();
  }
};
module.exports = errorHandler;

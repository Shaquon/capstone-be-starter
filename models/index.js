const mongoose = require("mongoose");
const User = require("./User");
const Bid = require("./Bid");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err.name === "MongoError" && err.code === 11000) {
    next({
      statusCode: 400,
      message: err.message
    });
    return;
  }

  next(err);
};

module.exports = {
  User,
  Bid,
  errorHandlerMiddleware,
  startup: () =>
    new Promise((resolve, reject) => {
      mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true
      });

      mongoose.connection
        .on("error", err => {
          reject(err);
        })
        .once("open", () => {
          resolve();
        });
    })
};

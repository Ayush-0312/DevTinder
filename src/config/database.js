const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("connecting to db" + process.env.DB_CONNECTION_SECRET);
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
};

module.exports = connectDB;

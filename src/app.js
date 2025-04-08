require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  //creating a new instance of a user model
  const user = new User({
    firstName: "Sachin",
    lastName: "Tendulkar",
    emailId: "Sachin@tendulkar.com",
    password: "Sachin@123",
    age: "45",
    gender: "Male",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the User: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(process.env.PORT, () => {
      console.log("Successfully listening...");
    });
  })
  .catch((err) => {
    console.error("Database not connected");
  });

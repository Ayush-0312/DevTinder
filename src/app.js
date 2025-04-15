require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//signup
app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    //creating a new instance of a user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //create a JWT token
      const token = await user.getJWT();

      //add the token to a cookie and send the response back to the user
      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });

      res.send("Login successful");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//get profile
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;

  console.log("Sending a connection request");
  res.send(user.firstName + " send connection request");
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

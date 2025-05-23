const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read the token from the req cookies
  //validate the token
  //find the user

  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login"); //error 401 -> user not logged in
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_TOKEN);

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth };

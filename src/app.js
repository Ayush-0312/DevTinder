require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established successfully");
    app.listen(process.env.PORT, () => {
      console.log("Successfully listening...");
    });
  })
  .catch((err) => {
    console.error("Database not connected" + err.message);
  });

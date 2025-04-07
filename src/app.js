const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello form the dashboard");
});

app.use("/hello", (req, res) => {
  res.send("Hello hello hello");
});

app.use("/test", (req, res) => {
  res.send("Hello form the server");
});

app.listen(7777, () => {
  console.log("Successfully listening...");
});

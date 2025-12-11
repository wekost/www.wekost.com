//server setup
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log("server ini sedang berjalan");
});

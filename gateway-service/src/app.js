// /src/app.js
const express = require("express");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");

const app = express();
app.use(bodyParser.json());

// POST route for login
app.post("/gateway/login", authController.login);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Gateway Service running on port ${PORT}`);
});

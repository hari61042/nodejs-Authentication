const express = require("express");
const bodyParser = require("body-parser");
const loginController = require("./controllers/loginController");

const app = express();
app.use(bodyParser.json());

// Login Route using (POST Method)
app.post("/login", loginController.login);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Login Service running on port ${PORT}`);
});

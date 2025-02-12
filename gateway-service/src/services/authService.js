// /src/services/authService.js
const axios = require("axios");

async function loginUser(username, password) {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    return { message: "Invalid credentials" };
  }
}

module.exports = { loginUser };

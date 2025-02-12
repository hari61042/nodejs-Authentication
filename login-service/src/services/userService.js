const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This will generate a bcrypt hash for "password123"
const hashedPassword = bcrypt.hashSync("password123", 10);

const users = [{ username: "user1", password: hashedPassword }];
const JWT_SECRET = "secretkey";

async function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Invalid credentials" };
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { success: true, token };
}

module.exports = { authenticateUser };

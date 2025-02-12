const userService = require("../services/userService");
const path = require("path");
const winston = require("winston");
const logFilePath = path.join(__dirname, "../logs", "login-service.log");

// Configure Winston for logging
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logFilePath }),
  ],
});

async function login(req, res) {
  const { username, password } = req.body;

  logger.info(`Login attempt for username: ${username}`);
  const result = await userService.authenticateUser(username, password);

  if (!result.success) {
    logger.info(`Failed login attempt for username: ${username}`);
    return res.status(401).json({ message: result.message });
  }

  logger.info(`Successful login for username: ${username}`);
  res.json({ token: result.token });
}

module.exports = { login };

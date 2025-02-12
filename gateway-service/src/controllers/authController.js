const authService = require("../services/authService");
const path = require("path");
const winston = require("winston");
const logFilePath = path.join(__dirname, "../logs", "gateway-service.log");

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

  logger.info(`Received login request for ${username}`);
  const result = await authService.loginUser(username, password);

  if (result.message) {
    logger.info(`Failed login attempt for ${username}`);
    return res.status(401).json({ message: result.message });
  }

  logger.info(`Authentication successful for ${username}`);
  res.json({ token: result.token });
}

module.exports = { login };

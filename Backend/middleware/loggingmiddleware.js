const fs = await import('fs/promises');

const loggingMiddleware = async (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${req.method} ${req.originalUrl}\n`;

  try {
    await fs.appendFile('access.log', logEntry);
  } catch (err) {
    console.error("Logging error:", err);
  }

  next();
};

export default loggingMiddleware;

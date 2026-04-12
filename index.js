require("dotenv").config();

const Server = require("./models/server");

const server = new Server();

// Local development
if (require.main === module) {
  server.listen();
}

// Vercel serverless
module.exports = server.app;

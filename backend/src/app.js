const express = require("express");
const { join } = require("node:path");
const defaultMiddlewares = require("./middlewares/defaults.middleware.js");
const { connectDB, checkConnection } = require("./server/server.js");
const { handleShutdown } = require("./utils/utils.js");
const allRoutes = require("./routes/index.js");
const { limiter, sanitizeInput } = require("./middlewares/security.middleware.js");
const mongoSanitize = require("./middlewares/mongoSanitize.js");
const dotenv = require("dotenv");

// Force database connection on startup
process.env.NODE_ENV = 'production';

dotenv.config({ path: join(__dirname, "..", ".env") });

const PORT = process.env.PORT || 9000;

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(limiter);
app.use(mongoSanitize);
app.use(sanitizeInput);

defaultMiddlewares(app);

// Always ensure database connection
connectDB(process.env.MONGODB_URI || "mongodb+srv://ragibintiser_db_user:Qpi1TkcfJLQCbGO2@my-cluster.4as1rmr.mongodb.net/vortex_blog");

app.get("/", function (_, res) {
  res.send({
    ok: true,
    message: "Nexus News API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", function (_, res) {
  res.send({
    ok: true,
    message: "API Health Check",
    database: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use("/api/v1", allRoutes);

app.use(function (_, res) {
  res.send({ message: "Route not found" });
});

if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
  });
  
  process.on("SIGTERM", () => handleShutdown(server));
  process.on("SIGINT", () => handleShutdown(server));
}

module.exports = app;

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");
const client = require("prom-client"); // Import Prometheus client

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

// Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Health Check Endpoint
app.get("/health", (req, res) => res.json({ status: "OK" }));

// ==============================
// Prometheus Metrics Setup:

const register = new client.Registry();

//Collect default Node.js metrics (CPU, memory, event loop):
client.collectDefaultMetrics({ register });

//Define a custom metric for HTTP request count:
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

register.registerMetric(httpRequestCounter);

//Middleware to count HTTP requests:
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path, 
      status_code: res.statusCode.toString(),
    });
  });
  next();
});

// Expose Prometheus metrics at /metrics:
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

module.exports = app;

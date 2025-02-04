const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

//Serve Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Health Check Endpoint
app.get("/health", (req, res) => res.json({ status: "OK" }));

module.exports = app;

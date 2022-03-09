const bodyParser = require("body-parser");

const express = require("express");
const { handler: calculateFinalPositionHandler } = require("./presentation/api/calculate-final-position");
const { handler: setInitialPositionHandler } = require("./presentation/api/set-initial-position");
const { handler: setPlateauSizeHandler } = require("./presentation/api/set-plateau-size");

const app = express();
const port = 8081;

// Middleware
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type",
  );
  next();
});

app.post("/api/plateau", async (req, res) => {
  const response = await setPlateauSizeHandler(req, res);

  return response;
});

app.post("/api/position", async (req, res) => {
  const response = await setInitialPositionHandler(req, res);

  return response;
});

app.patch("/api/position", async (req, res) => {
  const response = await calculateFinalPositionHandler(req, res);

  return response;
});

app.listen({ port }, () => {
  console.log(`Course server running at http://localhost:${port}`);
});

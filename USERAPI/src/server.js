const express = require("express");
const redis = require("redis");

const app = express();
const PORT = 4000;
const client = redis.createClient();

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => res.status(200).send("API is healthy"));

// CRUD Routes
app.post("/users", async (req, res) => {
  const { id, name } = req.body;
  await client.set(`user:${id}`, JSON.stringify({ id, name }));
  res.status(201).send("User created");
});

app.get("/users/:id", async (req, res) => {
  const user = await client.get(`user:${req.params.id}`);
  if (user) {
    res.status(200).send(JSON.parse(user));
  } else {
    res.status(404).send("User not found");
  }
});

app.put("/users/:id", async (req, res) => {
  const { name } = req.body;
  const user = await client.get(`user:${req.params.id}`);
  if (user) {
    await client.set(`user:${req.params.id}`, JSON.stringify({ id: req.params.id, name }));
    res.status(200).send("User updated");
  } else {
    res.status(404).send("User not found");
  }
});

app.delete("/users/:id", async (req, res) => {
  const user = await client.get(`user:${req.params.id}`);
  if (user) {
    await client.del(`user:${req.params.id}`);
    res.status(200).send("User deleted");
  } else {
    res.status(404).send("User not found");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


const express = require("express");
const bodyParser = require("body-parser");
const cakes = require("./data"); // Import the dummy data from data.js

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// GET: Fetch all cakes
app.get("/cakes", (req, res) => {
  res.json(cakes);
});

// GET: Fetch a specific cake by ID
app.get("/cakes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const cake = cakes.find((cake) => cake.id === id);

  if (!cake) {
    return res.status(404).json({ message: "Cake not found" });
  }

  res.json(cake);
});

// POST: Add a new cake
app.post("/cakes", (req, res) => {
  const { name, price, manufactureDate, expiryDate } = req.body;

  if (!name || !price || !manufactureDate || !expiryDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCake = {
    id: cakes.length + 1, // Auto-increment ID
    name,
    price,
    manufactureDate,
    expiryDate,
  };

  cakes.push(newCake);
  res.status(201).json({ message: "Cake added successfully", cake: newCake });
});

// PUT: Update a cake by ID
app.put("/cakes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, manufactureDate, expiryDate } = req.body;

  const cake = cakes.find((cake) => cake.id === id);

  if (!cake) {
    return res.status(404).json({ message: "Cake not found" });
  }

  // Update cake details
  if (name) cake.name = name;
  if (price) cake.price = price;
  if (manufactureDate) cake.manufactureDate = manufactureDate;
  if (expiryDate) cake.expiryDate = expiryDate;

  res.json({ message: "Cake updated successfully", cake });
});

// PATCH: Partially update a cake
app.patch("/cakes/:id", (req, res) => {
  const id = Number(req.params.id);
  const cake = cakes.find((cake) => cake.id === id);

  if (!cake) {
    return res.status(404).json({ message: "Cake not found" });
  }

  // Update only the fields provided in the request body
  if (req.body.name) cake.name = req.body.name;
  if (req.body.price) cake.price = req.body.price;
  if (req.body.manufactureDate) cake.manufactureDate = req.body.manufactureDate;
  if (req.body.expiryDate) cake.expiryDate = req.body.expiryDate;

  res.status(200).json({ message: "Cake partially updated", cake });
});


// DELETE: Remove a cake by ID
app.delete("/cakes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cakes.findIndex((cake) => cake.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Cake not found" });
  }

  cakes.splice(index, 1); // Remove the cake
  res.json({ message: "Cake deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

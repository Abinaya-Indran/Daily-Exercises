// data.js

// Create an array of 50 dummy cakes
const cakes = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1, // Unique ID
    name: `Cake ${index + 1}`,
    price: Math.floor(Math.random() * 100) + 10, // Random price between 10 and 100
    manufactureDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    expiryDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 10).toISOString().split('T')[0],
  }));
  
  // Export the data
  module.exports = cakes;
  
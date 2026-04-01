/*
 * Assigned Member: Backend Member 1 & 2 
 * Required Functions: Initialize Express and CORS boilerplate
 */
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DevMarket API server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

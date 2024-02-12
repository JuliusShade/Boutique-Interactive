require('dotenv').config;

const express = require('express');
const cors = require('cors');
const enableCors = require('./middleware/middleware.js');
const boutiqueRoutes = require('./routes/boutiqueRoutes');
const reportsRoutes = require('./routes/reportsRoutes');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my backend server!');
});

// Use boutique routes with '/api/boutique' as the base path
app.use('/api/boutiques', boutiqueRoutes);
app.use('/api/reports', reportsRoutes);

// Additional routes for fetching data, saving criteria, etc.

app.listen(port, () => console.log(`Server started on port ${port}`));

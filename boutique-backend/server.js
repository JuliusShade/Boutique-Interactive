const express = require('express');
const { enableCors } = require('./middleware/middleware.js');
const boutiqueRoutes = require('./routes/boutiqueRoutes');
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for the frontend to communicate with the backend
app.use(enableCors);

// Use boutique routes with '/api/boutique' as the base path
app.use('/api/boutiques', boutiqueRoutes);

// Additional routes for fetching data, saving criteria, etc.

app.listen(port, () => console.log(`Server started on port ${port}`));
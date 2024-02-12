const cors = require('cors');

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3001', // Adjust this to match your frontend application's URL
  optionsSuccessStatus: 200,
};

// Create and export CORS middleware with your options
module.exports = cors(corsOptions);

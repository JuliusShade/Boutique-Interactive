const cors = require('cors');

// CORS middleware to allow cross-origin requests
const corsOptions = {
  origin: 'http://localhost:3000', // or the specific URL of your frontend application
  optionsSuccessStatus: 200,
};

const enableCors = cors(corsOptions);

module.exports = {
  enableCors,
};

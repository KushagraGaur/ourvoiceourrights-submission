const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const { fetchMGNREGAData } = require('./jobs/dataFetcher');

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Start periodic MGNREGA data fetcher
fetchMGNREGAData(); // Run once at startup
require('./jobs/dataFetcher'); // If it contains cron jobs, they will continue running

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api/districts', require('./routes/districts'));
app.use('/api/district', require('./routes/metrics'));

// Serve frontend static files (React build)
const frontendBuildPath = path.join(__dirname, '../frontend/build');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(frontendBuildPath));

  // For any route not handled by API, serve React's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack || err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

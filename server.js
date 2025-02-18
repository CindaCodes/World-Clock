const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// Serve static files from their respective directories
app.use(express.static(process.cwd()));
app.use('/css', express.static(path.join(process.cwd(), 'CSS')));
app.use('/javascript', express.static(path.join(process.cwd(), 'javascript')));
app.use('/media', express.static(path.join(process.cwd(), 'Media')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint example
app.get('/api/time', async (req, res) => {
  try {
    // Example of making a secure API call
    const response = await axios.get('https://worldtimeapi.org/api/timezone/UTC');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch time data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
